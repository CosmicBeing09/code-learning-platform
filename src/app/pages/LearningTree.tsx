import { motion } from 'framer-motion';
import { BookOpen, Code, Rocket, CheckCircle, Lock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthHeader } from '../components/AuthHeader';

interface CourseProgress {
  id: string;
  title: string;
  icon: React.ReactNode;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  nextTopic: string;
  gradient: string;
  borderAccent: string;
  status: 'in-progress' | 'not-started' | 'completed';
}

const coursesProgress: CourseProgress[] = [
  {
    id: 'python',
    title: 'Python',
    icon: <Code className="w-6 h-6 text-blue-600" />,
    progress: 20,
    totalTopics: 5,
    completedTopics: 1,
    nextTopic: 'Control Flow',
    gradient: 'from-blue-100 via-blue-50 to-yellow-50',
    borderAccent: 'border-l-4 border-l-blue-500',
    status: 'in-progress'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: <BookOpen className="w-6 h-6 text-yellow-600" />,
    progress: 20,
    totalTopics: 5,
    completedTopics: 1,
    nextTopic: 'DOM Manipulation',
    gradient: 'from-yellow-100 via-yellow-50 to-slate-50',
    borderAccent: 'border-l-4 border-l-yellow-500',
    status: 'in-progress'
  },
  {
    id: 'java',
    title: 'Java',
    icon: <Rocket className="w-6 h-6 text-red-600" />,
    progress: 20,
    totalTopics: 5,
    completedTopics: 1,
    nextTopic: 'Classes & Objects',
    gradient: 'from-red-100 via-red-50 to-orange-50',
    borderAccent: 'border-l-4 border-l-red-500',
    status: 'in-progress'
  }
];

export function LearningTree() {
  const navigate = useNavigate();

  const handleContinueCourse = (courseId: string) => {
    navigate(`/course/${courseId}`);
    toast.success(`Continuing ${courseId} course`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Your Learning Progress</h1>
          <p className="text-gray-600">
            Track your progress across all programming courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesProgress.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-white rounded-lg shadow-sm overflow-hidden ${course.borderAccent}`}
            >
              <div className={`p-6 bg-gradient-to-br ${course.gradient}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {course.icon}
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      {course.completedTopics}/{course.totalTopics}
                    </span>
                    {course.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : course.status === 'not-started' ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Star className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Next Topic:</span>
                    <span>{course.nextTopic}</span>
                  </div>
                  <button
                    onClick={() => handleContinueCourse(course.id)}
                    className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-6 bg-white rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {coursesProgress.reduce((acc, curr) => acc + curr.completedTopics, 0)}
              </div>
              <div className="text-sm text-gray-600">Completed Topics</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {coursesProgress.length}
              </div>
              <div className="text-sm text-gray-600">Active Courses</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {Math.round(coursesProgress.reduce((acc, curr) => acc + curr.progress, 0) / coursesProgress.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Progress</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 