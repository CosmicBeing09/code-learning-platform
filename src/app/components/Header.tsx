import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Code2 } from 'lucide-react';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">
            CodeLearning
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              to="/translator"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Code2 className="w-4 h-4" />
              Code Translator
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 