import Post from '../models/postModal.js';

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
