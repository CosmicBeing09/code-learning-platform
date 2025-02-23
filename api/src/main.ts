/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { DatabaseService } from './services/database.service';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import courseRoutes from './routes/courses';
import topicRoutes from './routes/topics';
import userRoutes from './routes/users';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const db = DatabaseService.getInstance();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Hello from the Code Learning Platform API!');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
server.on('error', console.error);
