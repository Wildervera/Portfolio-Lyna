import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { About, Portfolio } from './pages';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/:id" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Portfolio isWorkPage={true} />} />
      </Routes>
    </>
  );
};

export default App;
