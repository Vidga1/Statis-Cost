import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; 

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Главная</Link>
      <Link to="/about" className="nav-link">О проекте</Link>
      <Link to="/login" className="nav-link">Вход</Link>
      <Link to="/register" className="nav-link">Регистрация</Link>
    </nav>
  );
};

export default NavigationBar;