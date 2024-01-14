import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../hooks/use-auth';
import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks';
import { loadUserCategories, Category as FirebaseCategory } from '../firebase/firebaseService';
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
  date: Date;
  totalExpense: number;
}

const MainPage: React.FC = () => {
  const { id } = useAuth();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categoriesByUserId[id || ''] || []);
  const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpenses>({});
  const [subcategoryExpenses, setSubcategoryExpenses] = useState<SubcategoryExpenses>({});
  const [categoryDates, setCategoryDates] = useState<CategoryDates>({});
  const [expenseRecords, setExpenseRecords] = useState<ExpenseRecord[]>([]);

  useEffect(() => {
    if (id) {
      const fetchCategories = async () => {
        const loadedCategories = await loadUserCategories(id);
        dispatch(setCategoriesForUser({ userId: id, categories: loadedCategories as FirebaseCategory[] }));
      };
      fetchCategories();
    }
  }, [id, dispatch]);

  const handleExpenseChange = (categoryId: number, value: string) => {
    setCategoryExpenses({ ...categoryExpenses, [categoryId]: Number(value) });
  };

  const handleSubcategoryExpenseChange = (key: string, value: string) => {
    setSubcategoryExpenses({ ...subcategoryExpenses, [key]: Number(value) });
  };

  const handleDateChange = (categoryId: number, date: Date | null) => {
    setCategoryDates({ ...categoryDates, [categoryId]: date });
  };

  const handleSave = (categoryId: number) => {
    const date = categoryDates[categoryId];
    const expense = categoryExpenses[categoryId];
    if (date && expense) {
      setExpenseRecords([...expenseRecords, { date, totalExpense: expense }]);
    }
  };

  return (
    <div className="main-container">
      {categories.map(category => (
        <div key={category.id} className="category-container">
          <div className="category-header">
            <span className="category-name">{category.name}</span>
            <input
              type="number"
              className="category-input"
              value={categoryExpenses[category.id] || ''}
              onChange={e => handleExpenseChange(category.id, e.target.value)}
            />
            <DatePicker
              selected={categoryDates[category.id]}
              onChange={date => handleDateChange(category.id, date)}
              className="date-picker"
              placeholderText='Выберите дату'
            />
            <button onClick={() => handleSave(category.id)}>Сохранить</button>
          </div>
          {category.subcategories.map(subcategory => (
            <div key={subcategory.id} className="subcategory-container">
              <span className="subcategory-name">{subcategory.name}</span>
              <input
                type="number"
                className="subcategory-input"
                value={subcategoryExpenses[`${category.id}-${subcategory.id}`] || ''}
                onChange={e => handleSubcategoryExpenseChange(`${category.id}-${subcategory.id}`, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
      <div className="expense-records">
        {expenseRecords.map((record, index) => (
          <div key={index}>
            {record.date.toLocaleDateString()}: Общий расход - {record.totalExpense}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
