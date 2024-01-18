import { useEffect, useState } from 'react';
import { useAuth } from './use-auth'; // Импорт вашего хука аутентификации
import { useAppDispatch, useAppSelector } from './redux-hooks'; // Импорт Redux хуков
import {
  loadUserCategories,
  loadUserExpenses,
  loadUserIncomes,
  saveUserExpenses,
  saveUserIncomes,
} from '../firebase/firebaseService'; // Импорт Firebase сервисов
import { setCategoriesForUser } from '../store/slices/categoriesSlice';
import { v4 as uuidv4 } from 'uuid';

// Определение типов
type CategoryExpenses = { [key: string]: number };
type SubcategoryExpenses = { [key: string]: number };
type CategoryDates = { [key: string]: Date | null };
type ExpenseRecord = {
  id: string;
  categoryId: string;
  date: Date;
  totalExpense: number;
};
type IncomeRecord = {
  id: string;
  categoryId: string;
  date: Date;
  totalIncome: number;
};
type SaveUserExpenses = (
  userId: string,
  expenses: ExpenseRecord[],
) => Promise<void>;
type SaveUserIncomes = (
  userId: string,
  incomes: IncomeRecord[],
) => Promise<void>;
type UseLoadCostReturnType = {
  categories: Category[]; // Добавьте это свойство
  categoryExpenses: CategoryExpenses;
  setCategoryExpenses: React.Dispatch<React.SetStateAction<CategoryExpenses>>;
  subcategoryExpenses: SubcategoryExpenses;
  setSubcategoryExpenses: React.Dispatch<
    React.SetStateAction<SubcategoryExpenses>
  >;
  categoryDates: CategoryDates;
  setCategoryDates: React.Dispatch<React.SetStateAction<CategoryDates>>;
  expenseRecords: ExpenseRecord[];
  setExpenseRecords: React.Dispatch<React.SetStateAction<ExpenseRecord[]>>;
  incomeRecords: IncomeRecord[];
  setIncomeRecords: React.Dispatch<React.SetStateAction<IncomeRecord[]>>;
  saveUserExpenses: SaveUserExpenses;
  saveUserIncomes: SaveUserIncomes;
  userId: string | null;
};

const useLoadCost = (): UseLoadCostReturnType => {
  const { id: userId } = useAuth(); 
  const dispatch = useAppDispatch();

  const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpenses>(
    {},
  );
  const [subcategoryExpenses, setSubcategoryExpenses] =
    useState<SubcategoryExpenses>({});
  const [categoryDates, setCategoryDates] = useState<CategoryDates>({});
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>([]);
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const loadedCategories = (await loadUserCategories(userId)) || [];
        const loadedExpenses = (await loadUserExpenses(userId)) || [];
        const loadedIncomes = (await loadUserIncomes(userId)) || [];

        dispatch(
          setCategoriesForUser({ userId, categories: loadedCategories }),
        );

        setExpenseRecords(
          loadedExpenses.map((expense) => ({ ...expense, id: uuidv4() })),
        );
        setIncomeRecords(
          loadedIncomes.map((income) => ({ ...income, id: uuidv4() })),
        );
      }
    };
    fetchData();
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && expenseRecords.length > 0) {
      saveUserExpenses(userId, expenseRecords);
    }
  }, [expenseRecords, userId]);

  useEffect(() => {
    if (userId && incomeRecords.length > 0) {
      saveUserIncomes(userId, incomeRecords);
    }
  }, [incomeRecords, userId]);

  return {
    categories: useAppSelector(
      (state) => state.categories.categoriesByUserId[userId || ''] || [],
    ),
    categoryExpenses,
    setCategoryExpenses,
    subcategoryExpenses,
    setSubcategoryExpenses,
    categoryDates,
    setCategoryDates,
    expenseRecords,
    setExpenseRecords,
    incomeRecords,
    setIncomeRecords,
    saveUserExpenses,
    saveUserIncomes,
    userId,
  };
};

export default useLoadCost;
