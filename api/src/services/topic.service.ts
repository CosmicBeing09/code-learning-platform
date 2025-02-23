import { prisma } from '../lib/prisma';

export const topicService = {
  async markAsComplete(id: string) {
    // Update current topic
    const topic = await prisma.topic.update({
      where: { id },
      data: {
        status: 'completed',
        completed: true,
        completedAt: new Date()
      }
    });

    // Find and unlock next topic if exists
    await prisma.topic.updateMany({
      where: {
        courseId: topic.courseId,
        order: topic.order + 1,
        status: 'locked'
      },
      data: {
        status: 'available'
      }
    });

    return topic;
  }
}; 