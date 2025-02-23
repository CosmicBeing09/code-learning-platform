import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';

interface Topic {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: string;
  order: number;
  userProgress: {
    completed: boolean;
    completedAt: string;
  }[];
}

const languageLogos = {
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  rust: 'https://raw.githubusercontent.com/rust-lang/rust-artwork/master/logo/rust-logo-512x512.png',
  go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'
};

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export function CourseContent() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { width, height } = useWindowSize();
  const [showCelebration, setShowCelebration] = useState(false);

  const checkCompletion = useCallback((percentage: number) => {
    if (percentage === 100) {
      setShowCelebration(true);
      toast.success('🎉 Congratulations! You\'ve completed the course!');
      setTimeout(() => setShowCelebration(false), 3000); // Hide after 5 seconds
    }
  }, []);

  useEffect(() => {
    checkCompletion(progress);
  }, [progress, checkCompletion]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/courses/${courseId}/topics`);
        if (!response.ok) throw new Error('Failed to fetch topics');
        const data = await response.json();

        // Process topics to set correct status based on completion and order
        const processedTopics = data.map((topic: Topic, index: number) => {
          const isCompleted = topic.userProgress?.some((p: { completed: boolean }) => p.completed);
          const previousCompleted = index === 0 || data[index - 1].userProgress?.some((p: { completed: boolean }) => p.completed);

          return {
            ...topic,
            status: isCompleted ? 'completed' : 
                   (previousCompleted ? 'available' : 'locked')
          };
        });

        setTopics(processedTopics);
        
        // Calculate progress
        const completedCount = processedTopics.filter((t: Topic) => 
          t.userProgress?.some((p: { completed: boolean }) => p.completed)
        ).length;
        setProgress((completedCount / processedTopics.length) * 100);
      } catch (error) {
        toast.error('Failed to load course topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [courseId]);

  const handleTopicClick = (topic: Topic) => {
    if (topic.status === 'locked') {
      toast.error('Complete previous topics to unlock this one!');
      return;
    }
    navigate(`/course/${courseId}/topic/${topic.id}`);
  };

  const handleMarkComplete = async (topicId: string) => {
    try {
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
      setTopics(prevTopics => {
        const updatedTopics = prevTopics.map((topic, index) => {
          if (topic.id === topicId) {
            // Mark current topic as completed
            return {
              ...topic,
              status: 'completed',
              userProgress: [{ completed: true, completedAt: new Date().toISOString() }]
            };
          }
          // Unlock next topic if exists
          if (index === prevTopics.findIndex(t => t.id === topicId) + 1) {
            return {
              ...topic,
              status: 'available'
            };
          }
          return topic;
        });

        // Update progress
        const completedCount = updatedTopics.filter((t: Topic) => 
          t.userProgress?.some((p: { completed: boolean }) => p.completed)
        ).length;
        setProgress((completedCount / updatedTopics.length) * 100);

        return updatedTopics;
      });

      toast.success('Topic marked as completed!');
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {showCelebration && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={['#22c55e', '#3b82f6', '#eab308', '#ec4899']}
        />
      )}
      
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <img
              src={languageLogos[courseId as keyof typeof languageLogos]}
              alt={`${courseId} logo`}
              className="w-12 h-12"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800">
                {courseId ? courseId.charAt(0).toUpperCase() + courseId.slice(1) : ''} Course Content
              </h1>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {Math.round(progress)}% Complete
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.01 }}
                className={`p-4 rounded-lg border transition-colors ${
                  topic.userProgress?.some(p => p.completed)
                    ? 'bg-green-50 border-green-200'
                    : topic.status === 'locked'
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="flex items-center gap-3 cursor-pointer flex-1"
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic.userProgress?.some(p => p.completed) ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : topic.status === 'locked' ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <PlayCircle className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                      <h3 className={`font-semibold ${
                        topic.userProgress?.some(p => p.completed)
                          ? 'text-green-700'
                          : 'text-gray-800'
                      }`}>
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                      {topic.userProgress?.some(p => p.completed) && (
                        <p className="text-xs text-green-600 mt-1">
                          Completed on {new Date(topic.userProgress[0].completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">{topic.duration} min</div>
                    {topic.status === 'available' && !topic.userProgress?.some(p => p.completed) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkComplete(topic.id);
                        }}
                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 