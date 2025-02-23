import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';

const router = Router();

// Get all courses
router.get('/', CourseController.getAllCourses);

// Get course by ID
router.get('/:courseId', CourseController.getCourseById);

// Get course topics
router.get('/:courseId/topics', CourseController.getCourseTopics);

export default router; 