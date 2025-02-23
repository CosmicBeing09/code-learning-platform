import { Router } from 'express';
import OpenAI from 'openai';

const router = Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Validation helper
const isValidLanguage = (language: string): boolean => {
  const supportedLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 
    'TypeScript', 'Ruby', 'Go', 'PHP', 
    'Swift', 'Rust'
  ];
  return supportedLanguages.includes(language);
};

// Code translation endpoint
router.post('/translate-code', async (req, res) => {
  try {
    const { sourceCode, sourceLanguage, targetLanguage } = req.body;

    if (!sourceCode || !sourceLanguage || !targetLanguage) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!isValidLanguage(sourceLanguage) || !isValidLanguage(targetLanguage)) {
      return res.status(400).json({ error: 'Unsupported programming language' });
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
      model: "gpt-4",
      temperature: 0.2,
    });

    const translatedCode = completion.choices[0].message.content?.trim();

    if (!translatedCode) {
      throw new Error('No translation generated');
    }

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

export default router; 