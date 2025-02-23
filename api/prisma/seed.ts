import { PrismaClient } from '@prisma/client';
import { pythonContent } from './seeds/python-content';
import { javascriptContent } from './seeds/javascript-content';
import { javaContent } from './seeds/java-content';
import { rustContent } from './seeds/rust-content';
import { goContent } from './seeds/go-content';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create dummy user first
  const dummyUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      id: 'dummy-user-123',  // Fixed ID for easy reference
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      name: 'Test User',
      targetLanguage: 'ENGLISH',
      experienceLevel: 'INTERMEDIATE',
      knownLanguages: ['JavaScript', 'Python'],
      dailyGoalMinutes: 30
    }
  });

  console.log('Created dummy user:', dummyUser.id);

  // Create courses
  const courses = [
    { id: 'python', title: 'Python Programming' },
    { id: 'javascript', title: 'JavaScript Development' },
    { id: 'java', title: 'Java Programming' },
    { id: 'rust', title: 'Rust Programming' },
    { id: 'go', title: 'Go Development' }
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: {},
      create: {
        id: course.id,
        title: course.title,
        description: `Complete ${course.title} course`,
        content: 'Course overview content'
      }
    });
  }

  // Create topics and content
  const allContent = {
    python: pythonContent,
    javascript: javascriptContent,
    java: javaContent,
    rust: rustContent,
    go: goContent
  };

  for (const [courseId, content] of Object.entries(allContent)) {
    for (const [topicId, topicData] of Object.entries(content)) {
      // Create topic
      const firstTopicInCourse = parseInt(topicId.slice(-1)) === 1;

      const topic = await prisma.topic.upsert({
        where: { id: topicId },
        update: {
          title: topicData.title,
          description: topicData.description
        },
        create: {
          id: topicId,
          title: topicData.title,
          description: topicData.description,
          duration: 60,
          order: parseInt(topicId.slice(-1)),
          status: firstTopicInCourse ? 'available' : 'locked',
          completed: false,
          courseId
        }
      });

      // Create topic content
      await prisma.topicContent.upsert({
        where: { topicId: topic.id },
        update: {
          content: topicData.content,
          exercises: topicData.exercises
        },
        create: {
          topicId: topic.id,
          content: topicData.content,
          exercises: topicData.exercises
        }
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 