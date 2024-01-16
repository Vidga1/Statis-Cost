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

import {
  handleExpenseChange,
  handleSubcategoryExpenseChange,
  handleDateChange,
  handleSaveExpense,
  handleSaveIncome,
  handleRemoveIncome,
  handleRemoveExpense,
  calculateTotalExpense,
  calculateTotalIncome,
} from '../components/cost/CalcCost';

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
      {categories.map((category) => (
        <div key={category.id} className="category-container">
          <div className="category-header">
            <span className="category-name">{category.name}</span>
            {categoryDates[category.id] && (
              <input
                type="number"
                className="category-input"
                placeholder="Введите сумму"
                value={categoryExpenses[category.id] || ''}
                onChange={(e) =>
                  handleExpenseChange(
                    setCategoryExpenses,
                    String(category.id),
                    e.target.value,
                  )
                }
              />
            )}
            <div className="date-picker-container">
              <DatePicker
                selected={categoryDates[category.id]}
                onChange={(date) =>
                  handleDateChange(setCategoryDates, String(category.id), date)
                }
                className="date-picker"
                placeholderText="Выберите дату"
              />
              <button
                onClick={() =>
                  handleSaveExpense(
                    setExpenseRecords,
                    expenseRecords,
                    String(category.id),
                    categoryDates,
                    calculateTotalExpense,
                    categoryExpenses,
                    subcategoryExpenses,
                  )
                }
              >
                Расход
              </button>
              <button
                onClick={() =>
                  handleSaveIncome(
                    setIncomeRecords,
                    incomeRecords,
                    String(category.id),
                    categoryDates,
                    calculateTotalIncome,
                    categoryExpenses,
                    subcategoryExpenses,
                  )
                }
              >
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
                    subcategoryExpenses[`${category.id}-${subcategory.id}`] ||
                    ''
                  }
                  onChange={(e) =>
                    handleSubcategoryExpenseChange(
                      setSubcategoryExpenses,
                      `${category.id}-${subcategory.id}`,
                      e.target.value,
                    )
                  }
                />
              )}
            </div>
          ))}
          {expenseRecords
            .filter((record) => record.categoryId === String(category.id))
            .map((record) => (
              <ExpenseItem
                key={record.id}
                record={record}
                onRemove={() =>
                  handleRemoveExpense(
                    setExpenseRecords,
                    expenseRecords,
                    record.id,
                  )
                }
              />
            ))}

          {incomeRecords
            .filter((record) => record.categoryId === String(category.id))
            .map((record) => (
              <IncomeItem
                key={record.id}
                record={record}
                onRemove={() =>
                  handleRemoveIncome(setIncomeRecords, incomeRecords, record.id)
                }
              />
            ))}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
