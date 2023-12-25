import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Импортируйте новые страницы
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

// Импортируйте уже существующие страницы
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/settings" element={<SettingPage />} />
    </Routes>
  );
}

export default App;
