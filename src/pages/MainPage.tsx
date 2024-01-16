import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
import ExpenseItem from '../components/cost/ExpenseItem';
import IncomeItem from '../components/cost/IncomeItem';

const MainPage: React.FC = () => {
  const { id } = useAuth();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categories.categoriesByUserId[id || ''] || [],
  );
  const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpenses>(
    {},
  );
  const [subcategoryExpenses, setSubcategoryExpenses] =
    useState<SubcategoryExpenses>({});
  const [categoryDates, setCategoryDates] = useState<CategoryDates>({});
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>([]);
  const [incomeRecords, setIncomeRecords] = useState<IncomeRecord[]>([]);
  const [currentValue, setCurrentValue] = useState('');

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

  const handleExpenseChange = (categoryId: number, value: string) => {
    setCategoryExpenses({ ...categoryExpenses, [categoryId]: Number(value) });
  };

  const handleSubcategoryExpenseChange = (key: string, value: string) => {
    setSubcategoryExpenses({ ...subcategoryExpenses, [key]: Number(value) });
  };

  const handleDateChange = (categoryId: number, date: Date | null) => {
    setCategoryDates({ ...categoryDates, [categoryId]: date });
  };

  const handleSubcategoryIncomeChange = (key: string, value: string) => {
    const updatedIncomes = { ...subcategoryIncomes, [key]: Number(value) };
    setSubcategoryIncomes(updatedIncomes);
    console.log(`Updated subcategory incomes for ${key}: `, updatedIncomes);
  };

  const calculateTotalExpense = (categoryId: number) => {
    const categoryExpense = categoryExpenses[categoryId] || 0;
    const subcategoryExpense = Object.keys(subcategoryExpenses)
      .filter((key) => key.startsWith(`${categoryId}-`))
      .reduce((sum, key) => sum + subcategoryExpenses[key], 0);
    return categoryExpense + subcategoryExpense;
  };

  const calculateTotalIncome = (categoryId: number) => {
    const subcategoryIncome = Object.keys(subcategoryExpenses)
      .filter((key) => key.startsWith(`${categoryId}-`))
      .reduce((sum, key) => sum + (subcategoryExpenses[key] || 0), 0);
    return subcategoryIncome;
  };

  const handleSaveExpense = (categoryId: number) => {
    const date = categoryDates[categoryId];
    const totalExpense = calculateTotalExpense(categoryId);
    if (date) {
      setExpenseRecords([
        ...expenseRecords,
        { id: uuidv4(), categoryId, date, totalExpense },
      ]);
    }
  };

  const handleSaveIncome = (categoryId: number) => {
    const date = categoryDates[categoryId];
    const totalIncome = calculateTotalIncome(categoryId);
    if (date) {
      setIncomeRecords([
        ...incomeRecords,
        { id: uuidv4(), categoryId, date, totalIncome },
      ]);
    }
  };

  const [categoryIncomes, setCategoryIncomes] = useState<CategoryExpenses>({});
  const [subcategoryIncomes, setSubcategoryIncomes] =
    useState<SubcategoryExpenses>({});

  const handleRemoveIncome = (recordId: string) => {
    const updatedRecords = incomeRecords.filter(
      (record) => record.id !== recordId,
    );
    setIncomeRecords(updatedRecords);
    saveUserIncomes(id!, updatedRecords);
  };

  const handleRemoveExpense = (recordId: string) => {
    const updatedRecords = expenseRecords.filter(
      (record) => record.id !== recordId,
    );
    setExpenseRecords(updatedRecords);
    saveUserExpenses(id!, updatedRecords);
  };

 return (
  <div className="main-container">
    {categories.map((category) => (
      <div key={category.id} className="category-container">
        <div className="category-header">
          <span className="category-name">{category.name}</span>
          <div className="date-picker-container">
            <DatePicker
              selected={categoryDates[category.id] || new Date()}
              onChange={(date) => handleDateChange(category.id, date)}
              className="date-picker"
              placeholderText="Выберите дату"
            />
            <button onClick={() => handleSaveExpense(category.id)}>
              Расход
            </button>
            <button onClick={() => handleSaveIncome(category.id)}>
              Доход
            </button>
          </div>
        </div>
        {category.subcategories.map((subcategory) => (
          <div key={subcategory.id} className="subcategory-container">
            <span className="subcategory-name">{subcategory.name}</span>
            {categoryDates[category.id] && (
              <input
                type="number"
                className="subcategory-input"
                placeholder="Введите сумму"
                value={
                  subcategoryExpenses[`${category.id}-${subcategory.id}`] || ''
                }
                onChange={(e) =>
                  handleSubcategoryExpenseChange(
                    `${category.id}-${subcategory.id}`,
                    e.target.value,
                  )
                }
              />
            )}
          </div>
        ))}
        {expenseRecords
          .filter((record) => record.categoryId === category.id)
          .map((record) => (
            <ExpenseItem
              key={record.id}
              record={record}
              onRemove={handleRemoveExpense}
            />
          ))}
        {incomeRecords
          .filter((record) => record.categoryId === category.id)
          .map((record) => (
            <IncomeItem
              key={record.id}
              record={record}
              onRemove={handleRemoveIncome}
            />
          ))}
      </div>
    ))}
  </div>
);
};

export default MainPage;
