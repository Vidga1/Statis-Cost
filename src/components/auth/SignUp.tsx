import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form } from './Form';
import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { saveUserData } from '../../firebase/firebaseService'; // Импорт функции saveUserData

interface UserData {
  email: string;
  token: string;
  id: string;
}

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const userData: UserData = {
          email: user.email || '',
          id: user.uid,
          token: user.refreshToken,
        };
        dispatch(setUser(userData));
        saveUserData(userData); // Сохранение данных пользователя в Firestore
        navigate('/settings');
      })
      .catch(console.error);
  };

  return <Form title="register" handleClick={handleRegister} />;
};

export { SignUp };
