import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

interface UserData {
  email: string;
  token: string;
  id: string;
}

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    const userRef = doc(firestore, 'users', userData.id);
    await setDoc(userRef, userData);
    console.log('Данные пользователя сохранены в Firestore');
  } catch (error) {
    console.error('Ошибка при сохранении данных пользователя:', error);
  }
};

export const saveUserCategories = async (userId: string, categories: Category[]): Promise<void> => {
  try {
    const categoriesRef = doc(firestore, 'userCategories', userId);
    await setDoc(categoriesRef, { categories });
    console.log('Категории пользователя сохранены в Firestore');
  } catch (error) {
    console.error('Ошибка при сохранении категорий пользователя:', error);
  }
};

export const loadUserCategories = async (userId: string): Promise<Category[] | null> => {
  try {
    const categoriesRef = doc(firestore, 'userCategories', userId);
    const docSnap = await getDoc(categoriesRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.categories as Category[];
    } else {
      console.log('Категории пользователя не найдены в Firestore');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке категорий пользователя:', error);
    return null;
  }
};
