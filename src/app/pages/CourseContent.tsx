import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

interface Topic {
  id: string;
  title: string;
  duration: string;
  status: 'locked' | 'available' | 'completed';
  description: string;
}

const courseTopics: Record<string, Topic[]> = {
  python: [
    {
      id: 'py1',
      title: 'Python Basics',
      duration: '45 min',
      status: 'completed',
      description: 'Introduction to Python syntax, variables, and basic data types'
    },
    {
      id: 'py2',
      title: 'Control Flow',
      duration: '60 min',
      status: 'available',
      description: 'Learn about if statements, loops, and control structures'
    },
    {
      id: 'py3',
      title: 'Functions & Methods',
      duration: '55 min',
      status: 'locked',
      description: 'Create reusable code with functions and methods'
    },
    {
      id: 'py4',
      title: 'Data Structures',
      duration: '75 min',
      status: 'locked',
      description: 'Master lists, dictionaries, sets, and tuples'
    },
    {
      id: 'py5',
      title: 'File Handling',
      duration: '50 min',
      status: 'locked',
      description: 'Read and write files, handle exceptions'
    }
  ],
  javascript: [
    {
      id: 'js1',
      title: 'JavaScript Fundamentals',
      duration: '40 min',
      status: 'completed',
      description: 'Core concepts of JavaScript and modern ES6+ features'
    },
    {
      id: 'js2',
      title: 'DOM Manipulation',
      duration: '65 min',
      status: 'available',
      description: 'Interact with HTML elements using JavaScript'
    },
    {
      id: 'js3',
      title: 'Async Programming',
      duration: '70 min',
      status: 'locked',
      description: 'Promises, async/await, and handling asynchronous operations'
    },
    {
      id: 'js4',
      title: 'React Basics',
      duration: '80 min',
      status: 'locked',
      description: 'Introduction to React components and hooks'
    },
    {
      id: 'js5',
      title: 'State Management',
      duration: '60 min',
      status: 'locked',
      description: 'Managing application state with Redux/Context'
    }
  ],
  java: [
    {
      id: 'java1',
      title: 'Java Basics',
      duration: '50 min',
      status: 'completed',
      description: 'Java syntax, variables, and object-oriented concepts'
    },
    {
      id: 'java2',
      title: 'Classes & Objects',
      duration: '70 min',
      status: 'available',
      description: 'Creating classes, inheritance, and polymorphism'
    },
    {
      id: 'java3',
      title: 'Collections Framework',
      duration: '65 min',
      status: 'locked',
      description: 'Lists, Sets, Maps, and collection utilities'
    },
    {
      id: 'java4',
      title: 'Exception Handling',
      duration: '45 min',
      status: 'locked',
      description: 'Try-catch blocks and exception hierarchies'
    },
    {
      id: 'java5',
      title: 'Spring Framework',
      duration: '90 min',
      status: 'locked',
      description: 'Building applications with Spring Boot'
    }
  ]
};

export function CourseContent() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const topics = courseTopics[courseId?.toLowerCase() || ''] || [];

  const handleTopicClick = (topic: Topic) => {
    if (topic.status === 'locked') {
      toast.error('Complete previous topics to unlock this one!');
      return;
    }
    toast.success(`Starting ${topic.title}`);
    // Navigate to the specific topic content
    // navigate(`/learn/${courseId}/${topic.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            {courseId ? courseId.charAt(0).toUpperCase() + courseId.slice(1) : ''} Course Content
          </h1>

          <div className="space-y-4">
            {topics.map((topic) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300
                  ${topic.status === 'locked' 
                    ? 'bg-gray-50 border-gray-200' 
                    : topic.status === 'completed'
                    ? 'bg-green-50 border-green-200 hover:bg-green-100'
                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                onClick={() => handleTopicClick(topic)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {topic.status === 'locked' ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : topic.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <PlayCircle className="w-5 h-5 text-blue-500" />
                    )}
                    <h3 className="font-semibold text-lg">{topic.title}</h3>
                  </div>
                  <span className="text-sm text-gray-500">{topic.duration}</span>
                </div>
                <p className="text-gray-600 ml-8">{topic.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 