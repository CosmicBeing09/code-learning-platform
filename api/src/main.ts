/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { DatabaseService } from './services/database.service';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Initialize database
const db = DatabaseService.getInstance();
const prisma = new PrismaClient();

// Test database connection
app.get('/api/db-test', async (req, res) => {
  try {
    const client = db.getClient();
    await client.$queryRaw`SELECT 1+1 AS result`; // Simple query to test connection
    res.json({ message: 'Database connection successful!' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Test user creation
app.post('/api/users', async (req, res) => {
  try {
    const client = db.getClient();
    const user = await client.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        targetLanguage: req.body.targetLanguage || 'ENGLISH', // Adding required field with default
        experienceLevel: req.body.experienceLevel || 'BEGINNER' // Adding required field with default
      }
    });
    res.json(user);
  } catch (error) {
    console.error('User creation failed:', error);
    res.status(500).json({ error: 'User creation failed' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the Code Learning Platform API!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
server.on('error', console.error);
