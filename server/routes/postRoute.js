import express from 'express';
import {
  createPost,
  getAllPosts,
  likePost,
  retweetPost,
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
router.put(
  '/post/retweet/:postId/:userId',
  isSignIn,
  getUserById,
  isAuthenticated,
  retweetPost
);

export default router;
