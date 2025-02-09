import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { LearningTree } from './pages/LearningTree';
import { Profile } from './pages/Profile';
import { PracticeHub } from './pages/PracticeHub';
import { Social } from './pages/Social';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<LearningTree />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/practice" element={<PracticeHub />} /> */
          <Route path="/social" element={<Social />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
