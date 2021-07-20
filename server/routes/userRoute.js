import express from 'express';
import { followUser, unfollowUser } from '../controllers/userController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.patch('/:id/follow', protect, followUser);
router.patch('/:id/unfollow', protect, unfollowUser);

export default router;
