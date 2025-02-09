import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, Code, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import Confetti from 'react-confetti';
import { useState } from 'react';

const courses = [
  {
    title: 'Python',
    description: [
      'Data structures & algorithms fundamentals',
      'Web development with Django/Flask',
      'Data science with pandas & numpy',
      'Machine learning with scikit-learn',
      'Automation and scripting',
    ],
    icon: <Code className="w-6 h-6 text-blue-600" />,
    gradient: 'from-blue-100 via-blue-50 to-yellow-50',
    borderAccent: 'border-l-4 border-l-blue-500',
  },
  {
    title: 'JavaScript',
    description: [
      'Modern ES6+ features and syntax',
      'React and Node.js development',
      'Asynchronous programming',
      'DOM manipulation & Web APIs',
      'Modern framework development',
    ],
    icon: <BookOpen className="w-6 h-6 text-yellow-600" />,
    gradient: 'from-yellow-100 via-yellow-50 to-slate-50',
    borderAccent: 'border-l-4 border-l-yellow-500',
  },
  {
    title: 'Java',
    description: [
      'Object-oriented programming concepts',
      'Enterprise application development',
      'Spring framework mastery',
      'Android app development',
      'Design patterns & best practices',
    ],
    icon: <Rocket className="w-6 h-6 text-red-600" />,
    gradient: 'from-red-100 via-red-50 to-orange-50',
    borderAccent: 'border-l-4 border-l-red-500',
  },
];

export function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleStartLearning = () => {
    setShowConfetti(true);
    toast.success('Welcome aboard! Let\'s start learning');
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showConfetti && <Confetti />}
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <motion.div 
          {...fadeIn}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold mb-4">
            Learn Programming the Right Way
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Interactive lessons, real-world projects, and a supportive community
          </p>
          <button 
            onClick={handleStartLearning}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Learning Now
          </button>
        </motion.div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.title}
                {...fadeIn}
                className={`relative p-6 rounded-lg border bg-gradient-to-br ${course.gradient} ${course.borderAccent} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    {course.icon}
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                  </div>
                  <ul className="text-gray-600 mb-6 text-sm space-y-2">
                    {course.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => toast.info(`Starting ${course.title} course`)}
                    className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    Start Course
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 