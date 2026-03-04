import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { About, Portfolio } from './pages';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/project/:id" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Portfolio isWorkPage={true} />} />
    </Routes>
  );
};

export default App;
