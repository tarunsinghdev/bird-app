import express from 'express';
import { createPost, getAllPosts } from '../controllers/postController.js';
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

export default router;
