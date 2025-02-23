import { prisma } from '../lib/prisma';

export const courseService = {
  async getAllCourses() {
    return prisma.course.findMany();
  },

  async getCourseById(id: string) {
    return prisma.course.findUnique({
      where: { id }
    });
  },

  async getCourseTopics(courseId: string) {
    return prisma.topic.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: {
        content: true
      }
    });
  }
}; 