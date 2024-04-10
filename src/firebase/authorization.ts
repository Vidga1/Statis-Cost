import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { setUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import { saveUserData } from './firebaseService';
import { useNavigate } from 'react-router-dom';

export const login = (
  email: string,
  password: string,
  dispatch: ReturnType<typeof useAppDispatch>,
  navigate: ReturnType<typeof useNavigate>,
) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      dispatch(
        setUser({
          email: user.email || '',
          id: user.uid,
          token: user.refreshToken,
        }),
      );
      navigate('/settings');
    })
    .catch(() => alert('Invalid user!'));
};

export const createUser = (
  email: string,
  password: string,
  dispatch: ReturnType<typeof useAppDispatch>,
  navigate: ReturnType<typeof useNavigate>,
) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      const userData: UserData = {
        email: user.email || '',
        id: user.uid,
        token: user.refreshToken,
      };
      dispatch(setUser(userData));
      saveUserData(userData);
      navigate('/settings');
    })
    .catch(console.error);
};
