import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SettingPage from './pages/SettingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </div>
  );
}
export default App;
