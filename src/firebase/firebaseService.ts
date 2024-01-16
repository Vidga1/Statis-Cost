import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

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
        date: new Date(expense.date),
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

export const loadUserIncomes = async (
  userId: string,
): Promise<IncomeRecord[] | null> => {
  try {
    const incomesRef = doc(firestore, 'userIncomes', userId);
    const docSnap = await getDoc(incomesRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const incomes = (data.incomes as IncomeRecord[]).map((income) => ({
        ...income,
        date: new Date(income.date),
      }));
      return incomes;
    } else {
      console.log('Доходы пользователя не найдены в Firestore');
      return null;
    }
  } catch (error) {
    console.error('Ошибка при загрузке доходов пользователя:', error);
    return null;
  }
};

export const saveUserIncomes = async (
  userId: string,
  incomes: IncomeRecord[],
): Promise<void> => {
  try {
    const formattedIncomes = incomes.map((income) => {
      if (!(income.date instanceof Date) || isNaN(income.date.getTime())) {
        console.error('Недействительная дата в доходах:', income);
        throw new RangeError('Invalid date value');
      }
      return {
        ...income,
        date: income.date.toISOString(),
      };
    });

    const incomesRef = doc(firestore, 'userIncomes', userId);
    await setDoc(incomesRef, { incomes: formattedIncomes });
    console.log('Доходы пользователя сохранены в Firestore');
  } catch (error) {
    console.error('Ошибка при сохранении доходов пользователя:', error);
  }
};
