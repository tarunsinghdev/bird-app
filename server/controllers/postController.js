import Post from '../models/postModal.js';
import User from '../models/userModal.js';

//POST Create new post
//ROUTE : /api/posts

export const createPost = async (req, res) => {
  const { content } = req.body;
  const owner = req.user._id;
  try {
    const post = await Post.create({ content, owner });
    res.status(201).json({ status: 'success', data: { post } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
// GET ALL POSTS
// Route : /api/posts

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('owner', 'userName');
    res.status(200).json({ status: 'success', data: { posts } });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

//PATCH Like posts
//Route : /api/posts/:id/like or /api/posts/:id/dislike

export const likeDislike = async (req, res) => {
  const option = req.originalUrl.includes('dislike') ? '$pull' : '$addToSet';
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { [option]: { 'postAnalytics.likes': req.user._id } },
      { new: true }
    );
    res.status(200).json({ status: 'success', data: { post } });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

//PATCH Retweet post
//Route : /api/posts/:id/retweet or /api/posts/:id/retweet

export const retweetPost = async (req, res) => {
  const option = req.originalUrl.includes('undoretweet')
    ? '$pull'
    : '$addToSet';
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { [option]: { 'postAnalytics.retweets': req.user._id } },
      { new: true }
    );
    res.status(200).json({ status: 'success', data: { post } });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

//DELETE Delete a post
//Route : /api/posts/:id/delete

export const deletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .json({ status: 'success', message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
