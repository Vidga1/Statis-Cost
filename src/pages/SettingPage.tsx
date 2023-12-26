import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import CategoryManager from '../components/Category/CategoryManager';
import './SettingPage.css';

const SettingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, email } = useAuth();
  const [hasCategories, setHasCategories] = useState(false);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background =
      'linear-gradient(to right, #a6c0fe, #f68084)';
    document.body.style.color = '#333';
    document.body.style.fontFamily = "'Arial', sans-serif";

    if (!isAuth) {
      navigate('/login');
    }
    return () => {
      document.body.style.background = '';
    };
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  const handleBeginCalculation = () => {
    navigate('/main');
  };

  const handleCategoriesChange = (hasCategories: boolean | ((prevState: boolean) => boolean)) => {
    setHasCategories(hasCategories);
  };

  return (
    <div className="SettingPage-container">
      <div className="SettingPage-header">
        <h1>Добро пожаловать, {email}!</h1>
        <button className="logoutButton" onClick={handleLogout}>
          Выйти
        </button>
      </div>
      <CategoryManager onCategoriesChange={handleCategoriesChange} />
      {hasCategories && (
        <button className="beginCalculationButton" onClick={handleBeginCalculation}>
          Начать расчёт
        </button>
      )}
    </div>
  );
};

export default SettingPage;
