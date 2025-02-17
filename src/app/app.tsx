import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { LearningTree } from './pages/LearningTree';
import { Profile } from './pages/Profile';
import { PracticeHub } from './pages/PracticeHub';
import { Social } from './pages/Social';
import { Settings } from './pages/Settings';
import { CourseContent } from './pages/CourseContent';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

// Create a layout component to handle Navigation visibility
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavigation = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="app-container">
      {children}
      {!hideNavigation && <Navigation />}
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<LearningTree />} />
          <Route path="/course/:courseId" element={<CourseContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/practice" element={<PracticeHub />} />
          <Route path="/social" element={<Social />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
