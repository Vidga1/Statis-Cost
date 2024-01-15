import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../hooks/use-auth';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import {
  loadUserCategories,
  Category as FirebaseCategory,
  loadUserExpenses,
  saveUserExpenses,
} from '../firebase/firebaseService';
import { setCategoriesForUser } from '../store/slices/categoriesSlice';
import './MainPage.css';

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface CategoryExpenses {
  [categoryId: string]: number;
}

interface SubcategoryExpenses {
  [key: string]: number;
}

interface CategoryDates {
  [categoryId: string]: Date | null;
}

interface ExpenseRecord {
  categoryId: number;
  date: Date;
  totalExpense: number;
}

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

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const loadedCategories = await loadUserCategories(id);
        const loadedExpenses = await loadUserExpenses(id);
        dispatch(
          setCategoriesForUser({
            userId: id,
            categories: loadedCategories as FirebaseCategory[],
          }),
        );
        if (loadedExpenses) {
          setExpenseRecords(loadedExpenses);
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

  const handleExpenseChange = (categoryId: number, value: string) => {
    setCategoryExpenses({ ...categoryExpenses, [categoryId]: Number(value) });
  };

  const handleRemoveExpense = (recordIndex: number) => {
    setExpenseRecords(
      expenseRecords.filter((_, index) => index !== recordIndex),
    );
  };

  const handleSubcategoryExpenseChange = (key: string, value: string) => {
    setSubcategoryExpenses({ ...subcategoryExpenses, [key]: Number(value) });
  };

  const handleDateChange = (categoryId: number, date: Date | null) => {
    setCategoryDates({ ...categoryDates, [categoryId]: date });
  };

  const calculateTotalExpense = (categoryId: number) => {
    const categoryExpense = categoryExpenses[categoryId] || 0;
    const subcategoryExpense = Object.keys(subcategoryExpenses)
      .filter((key) => key.startsWith(`${categoryId}-`))
      .reduce((sum, key) => sum + subcategoryExpenses[key], 0);

    return categoryExpense + subcategoryExpense;
  };

  const handleSave = (categoryId: number) => {
    const date = categoryDates[categoryId];
    const totalExpense = calculateTotalExpense(categoryId);
    if (date) {
      setExpenseRecords([
        ...expenseRecords,
        { categoryId, date, totalExpense },
      ]);
    }
  };

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
                value={categoryExpenses[category.id] || ''}
                onChange={(e) =>
                  handleExpenseChange(category.id, e.target.value)
                }
              />
            )}
            <div className="date-picker-container">
              <DatePicker
                selected={categoryDates[category.id]}
                onChange={(date) => handleDateChange(category.id, date)}
                className="date-picker"
                placeholderText="Выберите дату"
              />
              {categoryDates[category.id] && (
                <button onClick={() => handleSave(category.id)}>Расчёт</button>
              )}
            </div>
          </div>
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="subcategory-container">
              <span className="subcategory-name">{subcategory.name}</span>
              {categoryDates[category.id] && (
                <input
                  type="number"
                  className="subcategory-input"
                  value={
                    subcategoryExpenses[`${category.id}-${subcategory.id}`] ||
                    ''
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
            .map((record, index) => (
              <div key={index} className="total-expense">
                Сумма расходов{' '}
                {new Date(record.date).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}{' '}
                составляет {record.totalExpense} рублей.
                <button
                  onClick={() => handleRemoveExpense(index)}
                  className="remove-button"
                >
                  x
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default MainPage;
