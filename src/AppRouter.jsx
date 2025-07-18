import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RocketChat from './pages/RocketChat';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rocket" element={<RocketChat />} />
      </Routes>
    </Router>
  );
}
