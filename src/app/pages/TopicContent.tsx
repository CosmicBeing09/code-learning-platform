import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Brain } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface TopicData {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: string;
  content: string;
  exercises: Array<{
    question: string;
    hints: string[];
    solution: string;
  }>;
}

// Custom components for ReactMarkdown
const components = {
  // Custom code block rendering
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div className="my-4 rounded-lg overflow-hidden shadow-lg">
        <div className="bg-gray-800 px-4 py-2 text-gray-200 text-sm">
          {match[1].toUpperCase()}
        </div>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // Enhanced heading styles
  h1: (props: any) => (
    <h1 className="text-4xl font-bold text-gray-800 mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold text-gray-700 mt-6 mb-3" {...props} />
  ),
  // Enhanced list styles
  ul: (props: any) => (
    <ul className="list-disc list-inside space-y-2 my-4" {...props} />
  ),
  li: (props: any) => (
    <li className="text-gray-700 leading-relaxed" {...props} />
  ),
  // Enhanced paragraph styles
  p: (props: any) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),
};

export function TopicContent() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'exercises'>('content');
  const [showSolution, setShowSolution] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/topics/${topicId}`);
        if (!response.ok) throw new Error('Failed to fetch topic');
        const data = await response.json();
        setTopic(data);
      } catch (error) {
        toast.error('Failed to load topic content');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  const handleMarkComplete = async () => {
    try {
      // Using the dummy user ID
      const userId = 'dummy-user-123';

      const response = await fetch(`http://localhost:3333/api/topics/${topicId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          completed: true
        })
      });

      if (!response.ok) throw new Error('Failed to update progress');

      // Update local state
      setTopic(prev => prev ? { ...prev, status: 'completed' } : null);
      toast.success('Topic marked as completed!');

      // Optionally, refresh the topic list to show updated status
      navigate(`/course/${courseId}`);
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Topic not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <button
          onClick={() => navigate(`/course/${courseId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Course
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {topic.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{topic.description}</p>

            <div className="flex gap-6 border-b mb-8">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-4 px-6 text-lg font-medium transition-colors ${
                  activeTab === 'content'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Content
                </div>
              </button>
              <button
                onClick={() => setActiveTab('exercises')}
                className={`pb-4 px-6 text-lg font-medium transition-colors ${
                  activeTab === 'exercises'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Exercises
                </div>
              </button>
            </div>

            {activeTab === 'content' && (
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  components={components}
                >
                  {topic.content}
                </ReactMarkdown>
              </div>
            )}

            {activeTab === 'exercises' && (
              <div className="space-y-12">
                {topic.exercises.map((exercise, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                        Exercise {index + 1}
                      </h3>
                      <p className="text-lg text-gray-700 mb-6">
                        {exercise.question}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-medium text-lg mb-3 text-gray-800">
                          Hints:
                        </h4>
                        <ul className="list-disc list-inside space-y-2">
                          {exercise.hints.map((hint, hintIndex) => (
                            <li key={hintIndex} className="text-gray-600 text-lg">
                              {hint}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={() => 
                          setShowSolution(prev => ({
                            ...prev,
                            [index]: !prev[index]
                          }))
                        }
                        className="text-blue-600 hover:text-blue-700 font-medium text-lg"
                      >
                        {showSolution[index] ? 'Hide Solution' : 'Show Solution'}
                      </button>
                      
                      {showSolution[index] && (
                        <div className="mt-6">
                          <SyntaxHighlighter
                            language="java"
                            style={vscDarkPlus}
                            className="rounded-lg"
                            showLineNumbers
                          >
                            {exercise.solution}
                          </SyntaxHighlighter>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!topic.status.includes('completed') && (
              <button
                onClick={handleMarkComplete}
                className="mt-8 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark as Complete
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 