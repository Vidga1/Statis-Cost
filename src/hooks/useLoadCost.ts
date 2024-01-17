import { useEffect, useState } from 'react';
import { useAuth } from './use-auth'; // Импорт из вашего проекта
import { useAppDispatch, useAppSelector } from './redux-hooks'; // Импорт из вашего проекта
import {
  loadUserCategories,
  loadUserExpenses,
  loadUserIncomes,
  saveUserExpenses,
  saveUserIncomes,
} from '../firebase/firebaseService'; // Импорт из вашего проекта
import { setCategoriesForUser } from '../store/slices/categoriesSlice'; // Импорт из вашего проекта
import { v4 as uuidv4 } from 'uuid';

const useLoadCost = () => {
  const { id } = useAuth();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categories.categoriesByUserId[id || ''] || [],
  );

  const [categoryExpenses, setCategoryExpenses] = useState<{ [key: string]: number }>({});
  const [subcategoryExpenses, setSubcategoryExpenses] = useState<{ [key: string]: number }>({});
  const [categoryDates, setCategoryDates] = useState<{ [key: string]: Date | null }>({});
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>([]);
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const loadedCategories: Category[] = await loadUserCategories(id) || [];
        const loadedExpenses: ExpenseRecord[] = await loadUserExpenses(id) || [];
        const loadedIncomes: IncomeRecord[] = await loadUserIncomes(id) || [];

        dispatch(setCategoriesForUser({ userId: id, categories: loadedCategories }));

        const expensesWithId = loadedExpenses.map(expense => ({ ...expense, id: uuidv4() }));
        setExpenseRecords(expensesWithId);

        const incomesWithId = loadedIncomes.map(income => ({ ...income, id: uuidv4() }));
        setIncomeRecords(incomesWithId);
      }
    };
    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    if (id && expenseRecords.length > 0) {
      saveUserExpenses(id, expenseRecords);
    }
  }, [expenseRecords, id]);

  useEffect(() => {
    if (id && incomeRecords.length > 0) {
      saveUserIncomes(id, incomeRecords);
    }
  }, [incomeRecords, id]);

  // Возвращаемое значение и другие функции
  return {
    categories,
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
  };
};

export default useLoadCost;