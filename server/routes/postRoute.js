import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  likePost,
  retweetPost,
  deletePost,
} from '../controllers/postController.js';
import { getUserById } from '../controllers/userController.js';
import { isSignIn, isAuthenticated } from '../controllers/authController.js';

const router = express.Router();

router.post(
  '/post/create/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  createPost
);

router.get('/posts', getAllPosts);

router.put(
  '/post/like/:postId/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  likePost
);

router.post(
  '/post/retweet/:postId/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  retweetPost
);

router.get('/post/:postId', getPostById);

router.delete('/post/delete/:postId/:userId', deletePost);

export default router;
