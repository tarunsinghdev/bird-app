import express from 'express';
import { createPost } from '../controllers/postController.js';
import { getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/post/create', getUserById, createPost);

export default router;
