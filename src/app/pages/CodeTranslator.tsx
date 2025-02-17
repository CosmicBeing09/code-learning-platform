import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { ArrowRight, Code2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const programmingLanguages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'TypeScript',
  'Ruby',
  'Go',
  'PHP',
  'Swift',
  'Rust'
];

export function CodeTranslator() {
  const [sourceCode, setSourceCode] = useState('');
  const [translatedCode, setTranslatedCode] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('JavaScript');
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceCode.trim()) {
      toast.error('Please enter some code to translate');
      return;
    }

    setIsTranslating(true);
    // TODO: Implement actual translation logic
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay

    // Mockup translation (replace with actual API call)
    const mockTranslation = `# Translated from ${sourceLanguage} to ${targetLanguage}\n\n${sourceCode}`;
    setTranslatedCode(mockTranslation);
    setIsTranslating(false);
    toast.success('Code translated successfully!');
  };

  const handleCopy = () => {
    if (!translatedCode) return;
    
    navigator.clipboard.writeText(translatedCode);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Code Translator</h1>
          <p className="text-gray-600">
            Translate code between different programming languages
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Code Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Source Code</h2>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {programmingLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="Enter your code here..."
                className="w-full h-[400px] p-4 bg-white border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Code2 className="absolute top-4 right-4 text-gray-400 w-5 h-5" />
            </div>
          </motion.div>

          {/* Translated Code Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Translated Code</h2>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {programmingLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <textarea
                value={translatedCode}
                readOnly
                placeholder="Translated code will appear here..."
                className="w-full h-[400px] p-4 bg-gray-50 border rounded-lg font-mono text-sm focus:outline-none"
              />
              <button
                onClick={handleCopy}
                disabled={!translatedCode}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-400"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleTranslate}
            disabled={isTranslating || !sourceCode.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-5 h-5" />
            {isTranslating ? 'Translating...' : 'Translate Code'}
          </button>
        </motion.div>
      </div>
    </div>
  );
} 