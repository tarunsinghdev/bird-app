import User from '../models/userModal.js';
import Post from '../models/postModal.js';

export const createPost = (req, res, next) => {
  if (!req.body.content) {
    console.log('content param doesnt sent with request');
    return res.sendStatus(400);
  }

  const postData = {
    content: req.body.content,
    postedBy: req.params.userId, //-> session user
  };

  if (req.body.replyTo) {
    postData.replyTo = req.body.replyTo;
  }

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: 'postedBy' });
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log('error in create post');
      res.sendStatus(400);
    });
};

export const getAllPosts = async (req, res, next) => {
  Post.find()
    .populate('postedBy')
    .populate('retweetData')
    .populate('replyTo')
    .sort({ createdAt: -1 })
    .then(async (results) => {
      results = await User.populate(results, { path: 'replyTo.postedBy' });
      results = await User.populate(results, { path: 'retweetData.postedBy' });
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log('error in getting all posts');
      res.sendStatus(400);
    });
};

export const likePost = async (req, res, next) => {
  const userId = req.params.userId; // session user
  const postId = req.params.postId;

  const isLiked = req.profile.likes && req.profile.likes.includes(postId);

  let option = isLiked ? '$pull' : '$addToSet';

  //Insert user like
  req.profile = await User.findByIdAndUpdate(
    userId,
    { [option]: { likes: postId } },
    { new: true }
  ).catch((error) => console.log(error));

  //Insert post like
  let post = await Post.findByIdAndUpdate(
    postId,
    { [option]: { likeusers: userId } },
    { new: true }
  ).catch((error) => console.log(error));
  return res.status(200).send(post);
};

export const retweetPost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.params.userId;

  const deletedPost = await Post.findOneAndDelete({
    postedBy: userId,
    retweetData: postId,
  }).catch((error) => console.log(error));

  let option = deletedPost != null ? '$pull' : '$addToSet';

  let repost = deletedPost;

  if (repost == null) {
    repost = await Post.create({
      postedBy: userId,
      retweetData: postId,
    }).catch((error) => console.log(error));
  }

  //Insert user retweet
  req.profile = await User.findByIdAndUpdate(
    { _id: userId },
    { [option]: { retweets: repost._id } },
    { new: true }
  ).catch((error) => console.log(error));

  //Insert post retweet
  const updatedPost = await Post.findByIdAndUpdate(
    { _id: postId },
    { [option]: { retweetUsers: userId } },
    { new: true }
  ).catch((error) => console.log(error));

  res.status(200).send(updatedPost);
};

export const getPostById = async (req, res, next) => {
  let postData = await getPosts({ _id: req.params.postId });
  postData = postData[0];

  let results = {
    postData: postData,
  };
  if (postData.replyTo !== undefined) {
    results.replyTo = postData.replyTo;
  }

  results.replies = await getPosts({ replyTo: req.params.postId });

  res.status(200).send(results);
};

async function getPosts(filter) {
  let results = await Post.find(filter)
    .populate('postedBy')
    .populate('retweetData')
    .populate('replyTo')
    .sort({ createdAt: -1 })
    .catch((error) => console.log(error));

  results = await User.populate(results, { path: 'replyTo.postedBy' });
  return await User.populate(results, { path: 'retweetData.postedBy' });
}

export const deletePost = async (req, res, next) => {
  Post.findByIdAndDelete(req.params.postId)
    .then(() => res.sendStatus(202))
    .catch((error) => console.log(error));
};
