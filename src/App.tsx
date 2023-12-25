import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SettingPage from './pages/SettingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SettingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
