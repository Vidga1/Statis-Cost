import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import CategoryManager from '../components/Category/CategoryManager';
import '../styles/SettingPage.css';

const SettingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, email, id } = useAuth();
  const [hasCategories, setHasCategories] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(removeUser());
    navigate('/login');
  }, [dispatch, navigate]);

  const handleBeginCalculation = useCallback(() => {
    navigate('/main');
  }, [navigate]);

  const handleCategoriesChange = useCallback((hasCategories: boolean) => {
    setHasCategories(hasCategories);
  }, []);

  return (
    <div className="SettingPage-container">
      <div>
        <div className="SettingPage-header">
          <h1>Добро пожаловать, {email}!</h1>
          <button className="logoutButton" onClick={handleLogout}>
            Выйти
          </button>
        </div>
        {isAuth && id && (
          <CategoryManager
            userId={id}
            onCategoriesChange={handleCategoriesChange}
          />
        )}
        {hasCategories && (
          <button
            className="beginCalculationButton"
            onClick={handleBeginCalculation}
          >
            Начать расчёт
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingPage;
