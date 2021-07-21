import User from '../models/userModal.js';
import Post from '../models/postModal.js';

export const createPost = (req, res, next) => {
  if (!req.body.content) {
    console.log('content param doesnt sent with request');
    return res.sendStatus(400);
  }

  const postData = {
    content: req.body.content,
    postedBy: req.profile._id, //-> session user
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
