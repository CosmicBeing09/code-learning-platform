import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Award, Book, Calendar, Flag, Target, Trophy, User } from 'lucide-react';

interface Achievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
}

const achievements: Achievement[] = [
  {
    title: 'Fast Learner',
    description: 'Complete 5 lessons in one day',
    icon: <Trophy className="w-5 h-5 text-yellow-500" />,
    progress: 3,
    total: 5
  },
  {
    title: 'Consistent',
    description: 'Maintain a 7-day streak',
    icon: <Calendar className="w-5 h-5 text-green-500" />,
    progress: 5,
    total: 7
  },
  {
    title: 'Code Master',
    description: 'Complete all Python basics',
    icon: <Award className="w-5 h-5 text-blue-500" />,
    progress: 4,
    total: 10
  }
];

export function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-gray-600">@johndoe</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-semibold">Beginner</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">XP Points</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Current Streak</span>
                  <span className="font-semibold">5 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completed Lessons</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Current Goals */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Current Goals
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Daily Learning Goal</span>
                    <span className="text-sm text-blue-600">25/30 minutes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Weekly Challenges</span>
                    <span className="text-sm text-blue-600">4/5 completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className="p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.description}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(achievement.progress / achievement.total) * 100}%`
                            }}
                          />
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {achievement.progress}/{achievement.total} completed
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Book className="w-5 h-5 text-blue-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Flag className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Completed Python Basics</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Earned Fast Learner Badge</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 