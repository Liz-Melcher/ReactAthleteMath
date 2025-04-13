import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Placeholder components (replace these later with your real ones)
const Pyramid = () => <h2>Pyramid Workout Page</h2>;
const Ladder = () => <h2>Ladder Workout Page</h2>;
const DescendingLadder = () => <h2>Descending Ladder Workout Page</h2>;
const EvenSets = () => <h2>Even Sets Workout Page</h2>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pyramid" element={<Pyramid />} />
        <Route path="/ladder" element={<Ladder />} />
        <Route path="/descending" element={<DescendingLadder />} />
        <Route path="/even-sets" element={<EvenSets />} />
      </Routes>
    </Router>
  );
};

export default App;
