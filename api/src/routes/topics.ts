import { Router } from 'express';
import { TopicController } from '../controllers/topic.controller';

const router = Router();

// Get topic by ID
router.get('/:topicId', TopicController.getTopicById);

// Update topic progress
router.post('/:topicId/progress', TopicController.updateProgress);

export default router; 