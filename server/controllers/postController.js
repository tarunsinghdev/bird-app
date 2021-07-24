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

export const getAllPosts = (req, res, next) => {
  Post.find()
    .populate('postedBy')
    .sort({ createdAt: -1 })
    .then((results) => res.status(200).send(results))
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
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;

    const hasRetweeted = req.profile.retweets && req.profile.retweets.includes(postId);

  let option = hasRetweeted ? '$pull' : '$addToSet';

    //Insert user retweet
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { [option] : {retweets : postId} },
      { new: true }
    );

    //Insert post retweet

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { [option]: { retweetUsers: userId } },
      { new: true }
    );

    if (!updatedUser) {
      throw Error('No user found');
    }
    if (!updatedPost) {
      throw Error('No post found');
    }

    res.status(200).send(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
