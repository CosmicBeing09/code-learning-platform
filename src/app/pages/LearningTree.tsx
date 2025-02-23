import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthHeader } from '../components/AuthHeader';

interface Course {
  id: string;
  title: string;
  description: string;
  topics: {
    id: string;
    title: string;
    userProgress: {
      completed: boolean;
      completedAt: string;
    }[];
  }[];
}

interface CourseStats {
  total: number;
  completed: number;
  ongoing: number;
}

const languageLogos = {
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  rust: 'https://raw.githubusercontent.com/rust-lang/rust-artwork/master/logo/rust-logo-512x512.png',
  go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'
};

export function LearningTree() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<CourseStats>({
    total: 0,
    completed: 0,
    ongoing: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();

        // Filter courses with at least one completed topic
        const activeCourses = data.filter((course: Course) => 
          course.topics.some(topic => 
            topic.userProgress && topic.userProgress.length > 0 && topic.userProgress[0].completed
          )
        );

        // Calculate stats
        const completedCourses = activeCourses.filter((course: Course) => 
          course.topics.every((topic: Course['topics'][0]) => 
            topic.userProgress && topic.userProgress.length > 0 && topic.userProgress[0].completed
          )
        );

        setStats({
          total: data.length,
          completed: completedCourses.length,
          ongoing: activeCourses.length - completedCourses.length
        });

        setCourses(activeCourses);
      } catch (error) {
        toast.error('Failed to load learning progress');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Learning Tree</h1>
          <p className="text-gray-600">
            You haven't started any courses yet. 
            <button 
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700 ml-2"
            >
              Browse available courses
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <AuthHeader />
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Learning Progress</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-600">Total Courses</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-600">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-600">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.ongoing}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => {
            const totalTopics = course.topics.length;
            const completedTopics = course.topics.filter(topic => 
              topic.userProgress?.some(progress => progress.completed)
            ).length;
            const progress = (completedTopics / totalTopics) * 100;

            // Find next incomplete topic
            const nextTopic = course.topics.find(topic => 
              !topic.userProgress?.some(progress => progress.completed)
            );

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={languageLogos[course.id as keyof typeof languageLogos]}
                    alt={`${course.id} logo`}
                    className="w-12 h-12"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {course.title}
                    </h2>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {completedTopics} of {totalTopics} topics completed
                  </p>
                </div>

                {nextTopic && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-800">Next up:</h3>
                    <p className="text-blue-600">{nextTopic.title}</p>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Recently completed:</h3>
                  <div className="space-y-2">
                    {course.topics
                      .filter(topic => topic.userProgress?.some(p => p.completed))
                      .slice(-2) // Show only last 2 completed topics
                      .reverse()
                      .map(topic => (
                        <div key={topic.id} className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-gray-600">{topic.title}</span>
                          <span className="text-gray-400 text-xs">
                            {new Date(topic.userProgress[0].completedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 