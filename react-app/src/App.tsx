// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import HomeTodo from './pages/home-todo';
import PortalDetail from './pages/client/portal/detail';
import PortalList from './pages/client/portal';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Home />} />
          <Route path="/app/todo-list-app" element={<HomeTodo />} />
          <Route path="/app/portal" element={<PortalList />} />
          <Route path="/app/portal/:id" element={<PortalDetail />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
    </Router>
  );
};

export default App;
