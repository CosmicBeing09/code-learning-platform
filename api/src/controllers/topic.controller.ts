import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class TopicController {
  // Get topic by ID with content
  static async getTopicById(req: Request, res: Response) {
    try {
      const topic = await prisma.topic.findUnique({
        where: { id: req.params.topicId },
        include: { content: true }
      });

      if (!topic) {
        return res.status(404).json({ error: 'Topic not found' });
      }

      res.json({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        duration: topic.duration,
        status: topic.status,
        content: topic.content?.content || '',
        exercises: topic.content?.exercises || []
      });
    } catch (error) {
      console.error('Failed to fetch topic:', error);
      res.status(500).json({ error: 'Failed to fetch topic' });
    }
  }

  // Update topic progress
  static async updateProgress(req: Request, res: Response) {
    try {
      const { topicId } = req.params;
      const { userId, completed } = req.body;

      if (!userId || completed === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const progress = await prisma.topicProgress.upsert({
        where: {
          userId_topicId: { userId, topicId }
        },
        update: {
          completed,
          completedAt: completed ? new Date() : null
        },
        create: {
          userId,
          topicId,
          completed,
          completedAt: completed ? new Date() : null
        }
      });

      // If topic is completed, check if we should unlock the next topic
      if (completed) {
        const currentTopic = await prisma.topic.findUnique({
          where: { id: topicId },
          include: { course: { include: { topics: true } } }
        });

        if (currentTopic) {
          const nextTopic = currentTopic.course.topics.find(
            t => t.order === currentTopic.order + 1
          );

          if (nextTopic) {
            await prisma.topic.update({
              where: { id: nextTopic.id },
              data: { status: 'available' }
            });
          }
        }
      }

      res.json(progress);
    } catch (error) {
      console.error('Failed to update progress:', error);
      res.status(500).json({ error: 'Failed to update progress' });
    }
  }
} 