import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CategoriesProvider } from './components/Category/CategoriesContext';
import MainPage from './pages/MainPage';

// Импортируйте новые страницы
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

// Импортируйте уже существующие страницы
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <CategoriesProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </CategoriesProvider>
  );
}

export default App;
