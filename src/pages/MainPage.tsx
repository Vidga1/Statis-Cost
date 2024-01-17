import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
  loadUserCategories,
  loadUserExpenses,
  saveUserExpenses,
  loadUserIncomes,
  saveUserIncomes,
} from '../firebase/firebaseService';
import { setCategoriesForUser } from '../store/slices/categoriesSlice';
import './MainPage.css';
import { v4 as uuidv4 } from 'uuid';
import CostItems from '../components/cost/CostItems';

const MainPage: React.FC = () => {
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
        const loadedCategories = await loadUserCategories(id);
        const loadedExpenses = await loadUserExpenses(id);
        const loadedIncomes = await loadUserIncomes(id);

        dispatch(
          setCategoriesForUser({
            userId: id,
            categories: loadedCategories as Category[],
          }),
        );

        if (loadedExpenses) {
          const expensesWithId = loadedExpenses.map((expense) => ({
            ...expense,
            id: uuidv4(),
          }));
          setExpenseRecords(expensesWithId);
        }

        if (loadedIncomes) {
          const incomesWithId = loadedIncomes.map((income) => ({
            ...income,
            id: uuidv4(),
          }));
          setIncomeRecords(incomesWithId);
        }
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
      console.log('Saving income records to the database:', incomeRecords);
      saveUserIncomes(id, incomeRecords);
    }
  }, [incomeRecords, id]);

  return (
    <div className="main-container">
      <CostItems
        categories={categories}
        categoryExpenses={categoryExpenses}
        subcategoryExpenses={subcategoryExpenses}
        categoryDates={categoryDates}
        expenseRecords={expenseRecords}
        incomeRecords={incomeRecords}
        setCategoryExpenses={setCategoryExpenses}
        setSubcategoryExpenses={setSubcategoryExpenses}
        setCategoryDates={setCategoryDates}
        setExpenseRecords={setExpenseRecords}
        setIncomeRecords={setIncomeRecords}
      />
    </div>
  );
};

export default MainPage;
