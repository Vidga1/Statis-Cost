// firebaseService.ts
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const saveUserData = async (userData: {
  email: string;
  token: string;
  id: string;
}) => {
  try {
    const userRef = doc(firestore, 'users', userData.id);
    await setDoc(userRef, userData);
    console.log('Данные пользователя сохранены в Firestore');
  } catch (error) {
    console.error('Ошибка при сохранении данных пользователя:', error);
  }
};
