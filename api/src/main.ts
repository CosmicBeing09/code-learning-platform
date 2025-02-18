/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import { DatabaseService } from './services/database.service';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:4200', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Initialize database
const db = DatabaseService.getInstance();
const prisma = new PrismaClient();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

// Add this validation helper
const isValidLanguage = (language: string): boolean => {
  const supportedLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 
    'TypeScript', 'Ruby', 'Go', 'PHP', 
    'Swift', 'Rust'
  ];
  return supportedLanguages.includes(language);
};

// Add this new endpoint
app.post('/api/translate-code', async (req, res) => {
  try {
    const { sourceCode, sourceLanguage, targetLanguage } = req.body;

    if (!sourceCode || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    if (!isValidLanguage(sourceLanguage) || !isValidLanguage(targetLanguage)) {
      return res.status(400).json({
        error: 'Unsupported programming language'
      });
    }

    const prompt = `You are an expert programmer. Translate the following ${sourceLanguage} code to ${targetLanguage}.
The translation should:
1. Follow ${targetLanguage} best practices and conventions
2. Maintain the same functionality
3. Include any necessary imports or package declarations
4. Preserve comments (translated to English if needed)

Here's the code to translate:

${sourceCode}

Respond only with the translated code, no explanations or markdown.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      temperature: 0.2, // Lower temperature for more consistent translations
    });

    const translatedCode = completion.choices[0].message.content?.trim();

    if (!translatedCode) {
      throw new Error('No translation generated');
    }

    // Save translation to history if user is authenticated
    // TODO: Implement translation history

    res.json({ 
      translatedCode,
      sourceLanguage,
      targetLanguage 
    });

  } catch (error) {
    console.error('Translation failed:', error);
    res.status(500).json({ 
      error: 'Translation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
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