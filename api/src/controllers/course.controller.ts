import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class CourseController {
  // Get all courses with progress
  static async getAllCourses(req: Request, res: Response) {
    try {
      const userId = 'dummy-user-123'; // Using dummy user for now

      const courses = await prisma.course.findMany({
        include: {
          topics: {
            include: {
              userProgress: {
                where: { userId }
              }
            },
            orderBy: { order: 'asc' }
          }
        }
      });

      res.json(courses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  }

  // Get course by ID
  static async getCourseById(req: Request, res: Response) {
    try {
      const { courseId } = req.params;

      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          topics: {
            orderBy: { order: 'asc' }
          }
        }
      });

      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.json(course);
    } catch (error) {
      console.error('Failed to fetch course:', error);
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  }

  // Get course topics with progress
  static async getCourseTopics(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      const userId = 'dummy-user-123'; // Using dummy user for now

      const topics = await prisma.topic.findMany({
        where: { courseId },
        orderBy: { order: 'asc' },
        include: {
          userProgress: {
            where: { userId }
          }
        }
      });

      // Process topics to set correct status based on completion and order
      const processedTopics = topics.map((topic, index) => {
        const isCompleted = topic.userProgress?.some(p => p.completed);
        const previousCompleted = index === 0 || topics[index - 1].userProgress?.some(p => p.completed);

        return {
          ...topic,
          status: isCompleted ? 'completed' : 
                 (previousCompleted ? 'available' : 'locked')
        };
      });

      res.json(processedTopics);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
      res.status(500).json({ error: 'Failed to fetch topics' });
    }
  }
} 