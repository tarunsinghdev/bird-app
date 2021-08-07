import express from 'express';
import {
  createPost,
  deletePost,
  getPosts,
  likeDislike,
  retweetPost,
} from '../controllers/postController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.get('/', protect, getPosts);
router.post('/', protect, createPost);

router.patch('/:id/like', protect, likeDislike);
router.patch('/:id/dislike', protect, likeDislike);

router.patch('/:id/retweet', protect, retweetPost);
router.patch('/:id/undoretweet', protect, retweetPost);

router.delete('/:id/delete', protect, deletePost);

export default router;
