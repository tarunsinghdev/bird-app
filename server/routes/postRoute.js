import express from 'express';
import { createPost } from '../controllers/postController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/', protect, createPost);

export default router;
