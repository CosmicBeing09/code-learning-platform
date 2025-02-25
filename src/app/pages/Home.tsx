import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { BookOpen, Code, Rocket, Cog, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import Confetti from 'react-confetti';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const courses = [
  {
    title: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    description: [
      'Data structures & algorithms fundamentals',
      'Web development with Django/Flask',
      'Data science with pandas & numpy',
      'Machine learning with scikit-learn',
      'Automation and scripting',
    ],
    gradient: 'from-blue-100 via-blue-50 to-yellow-50',
    borderAccent: 'border-l-4 border-l-blue-500',
  },
  {
    title: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    description: [
      'Modern ES6+ features and syntax',
      'React and Node.js development',
      'Asynchronous programming',
      'DOM manipulation & Web APIs',
      'Modern framework development',
    ],
    gradient: 'from-yellow-100 via-yellow-50 to-slate-50',
    borderAccent: 'border-l-4 border-l-yellow-500',
  },
  {
    title: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    description: [
      'Object-oriented programming concepts',
      'Enterprise application development',
      'Spring framework mastery',
      'Android app development',
      'Design patterns & best practices',
    ],
    gradient: 'from-red-100 via-red-50 to-orange-50',
    borderAccent: 'border-l-4 border-l-red-500',
  },
  {
    title: 'Rust',
    logo: 'https://raw.githubusercontent.com/rust-lang/rust-artwork/master/logo/rust-logo-512x512.png',
    description: [
      'Systems programming fundamentals',
      'Memory safety and ownership',
      'Concurrent programming',
      'Cross-platform development',
      'Performance optimization',
    ],
    gradient: 'from-orange-100 via-orange-50 to-red-50',
    borderAccent: 'border-l-4 border-l-orange-500',
  },
  {
    title: 'Go',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    description: [
      'Concurrent programming with goroutines',
      'Microservices development',
      'Cloud-native applications',
      'High-performance networking',
      'Backend system design',
    ],
    gradient: 'from-cyan-100 via-cyan-50 to-blue-50',
    borderAccent: 'border-l-4 border-l-cyan-500',
  },
];

export function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const handleStartLearning = () => {
    setShowConfetti(true);
    toast.success('Welcome aboard! Let\'s start learning');
    
    // Scroll to courses section with highlight effect
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
      coursesSection.classList.add('highlight-section');
      setTimeout(() => {
        coursesSection.classList.remove('highlight-section');
      }, 1500);
    }
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleCourseStart = (courseTitle: string) => {
    navigate(`/course/${courseTitle.toLowerCase()}`);
    toast.info(`Starting ${courseTitle} course`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showConfetti && <Confetti />}
      <Header />
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
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={handleStartLearning}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Learning Now
            </button>
            <Link
              to="/learn"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Learning Progress
            </Link>
          </div>
        </motion.div>

        <section 
          id="courses-section" 
          className="transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course.title}
                {...fadeIn}
                className={`relative p-6 rounded-lg border bg-gradient-to-br ${course.gradient} ${course.borderAccent} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={course.logo}
                      alt={`${course.title} logo`}
                      className="w-8 h-8"
                    />
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                  </div>
                  <ul className="text-gray-600 mb-6 text-sm space-y-2">
                    {course.description.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500 mt-2"></span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handleCourseStart(course.title)}
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