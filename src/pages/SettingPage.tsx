import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser, setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import CategoryManager from '../components/Category/CategoryManager';
import './SettingPage.css';
import { firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const SettingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, email, id } = useAuth();
  const [hasCategories, setHasCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (isAuth && id) {
      setIsLoading(true); 
      const userRef = doc(firestore, 'users', id);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            dispatch(
              setUser({
                email: userData.email,
                token: userData.token,
                id: userData.id,
              }),
            );
          }
          setIsLoading(false); 
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных пользователя: ', error);
          setIsLoading(false); 
        });
    } else {
      setIsLoading(false);
    }
  }, [id, isAuth, dispatch]);

  const handleLogout = () => {
    dispatch(removeUser());
    navigate('/login');
  };

  const handleBeginCalculation = () => {
    navigate('/main');
  };

  const handleCategoriesChange = (
    hasCategories: boolean | ((prevState: boolean) => boolean),
  ) => {
    setHasCategories(hasCategories);
  };

  return (
    <div className="SettingPage-container">
        <div>
          <div className="SettingPage-header">
            <h1>Добро пожаловать!</h1>
            <button className="logoutButton" onClick={handleLogout}>
              Выйти
            </button>
          </div>
          <CategoryManager onCategoriesChange={handleCategoriesChange} />
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
