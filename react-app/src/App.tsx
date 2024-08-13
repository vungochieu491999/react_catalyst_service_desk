// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import HomeTodo from './pages/home-todo';
import ITHelpDesk from './pages/it-help-desk';
import CreateRequest from './pages/create-request';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<Home />} />
          <Route path="/app/it-help-desk" element={<ITHelpDesk />} />
          <Route path="/app/hr-help-desk" element={<ITHelpDesk />} />
          <Route path="/app/central-service-desk" element={<ITHelpDesk />} />
          <Route path="/app/create-request" element={<CreateRequest />} />
          <Route path="/app/todo-list-app" element={<HomeTodo />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
    </Router>
  );
};

export default App;
