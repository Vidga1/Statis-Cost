import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

// Определение интерфейсов
interface UserData {
  email: string;
  token: string;
  id: string;
}

interface Subcategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface ExpenseRecord {
  categoryId: number;
  date: Date; // Теперь date всегда объект Date
  totalExpense: number;
}

// Функции для работы с данными пользователя
export const saveUserData = async (userData: UserData): Promise<void> => {
  try {
    const userRef = doc(firestore, 'users', userData.id);
    await setDoc(userRef, userData);
    console.log('Данные пользователя сохранены в Firestore');
  } catch (error) {
    console.error('Ошибка при сохранении данных пользователя:', error);
  }
};

export const loadUserCategories = async (
  userId: string,
): Promise<Category[] | null> => {
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

export const saveUserCategories = async (
  userId: string,
  categories: Category[],
): Promise<void> => {
  try {
    const categoriesRef = doc(firestore, 'userCategories', userId);
    await setDoc(categoriesRef, { categories });
    console.log('Категории пользователя сохранены в Firestore');
  } catch (error) {
    console.error('Ошибка при сохранении категорий пользователя:', error);
  }
};

// Функции для работы с расходами пользователя
export const loadUserExpenses = async (
  userId: string,
): Promise<ExpenseRecord[] | null> => {
  try {
    const expensesRef = doc(firestore, 'userExpenses', userId);
    const docSnap = await getDoc(expensesRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const expenses = (data.expenses as ExpenseRecord[]).map((expense) => ({
        ...expense,
        date: new Date(expense.date), // Преобразование строки в объект Date
      }));
      return expenses;
    } else {
      console.log('Расходы пользователя не найдены в Firestore');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке расходов пользователя:', error);
    return null;
  }
};

export const saveUserExpenses = async (
  userId: string,
  expenses: ExpenseRecord[],
): Promise<void> => {
  try {
    const formattedExpenses = expenses.map((expense) => {
      if (!(expense.date instanceof Date) || isNaN(expense.date.getTime())) {
        console.error('Недействительная дата в расходах:', expense);
        throw new RangeError('Invalid date value');
      }
      return {
        ...expense,
        date: expense.date.toISOString(),
      };
    });

    const expensesRef = doc(firestore, 'userExpenses', userId);
    await setDoc(expensesRef, { expenses: formattedExpenses });
    console.log('Расходы пользователя сохранены в Firestore');
  } catch (error) {
    console.error('Ошибка при сохранении расходов пользователя:', error);
  }
};
