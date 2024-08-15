// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import HomeTodo from './pages/home-todo';
import PortalDetail from './pages/client/portal/detail';
import PortalList from './pages/client/portal';
import Signup from './pages/client/auth/signup';
import LoginPage from './pages/client/auth/login';
import UserProfile from './pages/client/user/profile';
import AuthRoute from './utils/AuthRoute';

declare global {
  interface Window {
    catalyst: any; // Add type definition for `catalyst` if available
  }
}

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/app/signup" element={<Signup />} />
          <Route path="/app/login" element={<LoginPage />} />

          <Route path="/" element={<AuthRoute element={Home} />} />
          <Route path="/app" element={<AuthRoute element={Home} />} />
          <Route path="/app/profile" element={<AuthRoute element={UserProfile} />} />
          <Route path="/app/todo-list-app" element={<AuthRoute element={HomeTodo} />} />
          <Route path="/app/portal" element={<AuthRoute element={PortalList} />} />
          <Route path="/app/portal/:id" element={<AuthRoute element={PortalDetail} />} />

          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
    </Router>
  );
};

export default App;
