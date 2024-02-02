import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExpenseItem from '../../helpers/ExpenseItem';
import IncomeItem from '../../helpers/IncomeItem';
import {
  handleExpenseChange,
  handleSubcategoryExpenseChange,
  handleDateChange,
  saveExpenseRecord,
  saveIncomeRecord,
  removeExpenseRecord,
  removeIncomeRecord,
  calculateTotalExpense,
  calculateTotalIncome,
} from '../../helpers/calcCost';
import { v4 as uuidv4 } from 'uuid';

const CostItems: React.FC<CostItemsProps> = ({
  categories,
  categoryExpenses,
  subcategoryExpenses,
  categoryDates,
  expenseRecords,
  incomeRecords,
  setCategoryExpenses,
  setSubcategoryExpenses,
  setCategoryDates,
  setExpenseRecords,
  setIncomeRecords,
  userId,
  saveUserExpenses,
  saveUserIncomes,
}) => {
  const navigate = useNavigate();

  const resetInputs = () => {
    setCategoryExpenses({});
    setSubcategoryExpenses({});
    setCategoryDates({});
  };

  const handleViewWeeklyExpenses = (categoryId: string) => {
    navigate(`/stats?type=expenses&period=week&categoryId=${categoryId}`);
  };

  const handleViewWeeklyIncome = (categoryId: string) => {
    navigate(`/stats?type=income&period=week&categoryId=${categoryId}`);
  };

  return (
    <>
      {categories.map((category) => (
        <div key={category.id} className="category-container">
          <div className="category-header">
            <span className="category-name">{category.name}</span>
            <input
              type="number"
              className="category-input"
              placeholder="Введите сумму"
              value={categoryExpenses[category.id] || ''}
              onChange={(e) =>
                setCategoryExpenses((prev) =>
                  handleExpenseChange(
                    prev,
                    category.id.toString(),
                    e.target.value,
                  ),
                )
              }
            />
            <div className="date-picker-container">
              <DatePicker
                selected={categoryDates[category.id]}
                onChange={(date) =>
                  setCategoryDates((prev) =>
                    handleDateChange(prev, category.id.toString(), date),
                  )
                }
                className="date-picker"
                placeholderText="Выберите дату"
              />
            </div>
          </div>
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="subcategory-container">
              <span className="subcategory-name">{subcategory.name}</span>
              <input
                type="number"
                className="subcategory-input"
                placeholder="Введите сумму"
                value={
                  subcategoryExpenses[`${category.id}-${subcategory.id}`] || ''
                }
                onChange={(e) =>
                  setSubcategoryExpenses((prev) =>
                    handleSubcategoryExpenseChange(
                      prev,
                      `${category.id}-${subcategory.id}`,
                      e.target.value,
                    ),
                  )
                }
              />
            </div>
          ))}
          <div className="view-stats-buttons"></div>
          <div className="expenses-incomes-container">
            <div className="expenses-container">
              <button
                onClick={() => {
                  const totalExpense = calculateTotalExpense(
                    categoryExpenses,
                    subcategoryExpenses,
                    category.id.toString(),
                  );
                  const newRecord = {
                    id: uuidv4(),
                    categoryId: category.id.toString(),
                    date: categoryDates[category.id] || new Date(),
                    totalExpense,
                  };
                  saveExpenseRecord(
                    expenseRecords,
                    category.id.toString(),
                    categoryDates,
                    calculateTotalExpense,
                    categoryExpenses,
                    subcategoryExpenses,
                  );
                  setExpenseRecords([...expenseRecords, newRecord]);
                  resetInputs();
                }}
                style={{ backgroundColor: 'indigo', color: 'white' }}
              >
                Добавить Расход
              </button>
              <button
                onClick={() => handleViewWeeklyExpenses(category.id.toString())}
                style={{ backgroundColor: 'darkred', color: 'white' }}
              >
                Статистика за неделю
              </button>
              <h3 className="expenses-header">Расходы</h3>
              {expenseRecords
                .filter(
                  (record) => record.categoryId === category.id.toString(),
                )
                .map((record) => (
                  <ExpenseItem
                    key={record.id}
                    record={record}
                    onRemove={() =>
                      setExpenseRecords((prev) =>
                        removeExpenseRecord(prev, record.id),
                      )
                    }
                  />
                ))}
            </div>
            <div className="incomes-container">
              <button
                onClick={() => {
                  const totalIncome = calculateTotalIncome(
                    categoryExpenses,
                    subcategoryExpenses,
                    category.id.toString(),
                  );
                  const newRecord = {
                    id: uuidv4(),
                    categoryId: category.id.toString(),
                    date: categoryDates[category.id] || new Date(),
                    totalIncome,
                  };
                  saveIncomeRecord(
                    incomeRecords,
                    category.id.toString(),
                    categoryDates,
                    calculateTotalIncome,
                    categoryExpenses,
                    subcategoryExpenses,
                  );
                  setIncomeRecords([...incomeRecords, newRecord]);
                  resetInputs();
                }}
                style={{ backgroundColor: 'indigo', color: 'white' }}
              >
                Добавить Доход
              </button>
              <button
                onClick={() => handleViewWeeklyIncome(category.id.toString())}
                style={{ backgroundColor: 'darkred', color: 'white' }}
              >
                Статистика за неделю
              </button>
              <h3 className="incomes-header">Доходы</h3>

              {incomeRecords
                .filter(
                  (record) => record.categoryId === category.id.toString(),
                )
                .map((record) => (
                  <IncomeItem
                    key={record.id}
                    record={record}
                    onRemove={() =>
                      setIncomeRecords((prev) =>
                        removeIncomeRecord(prev, record.id),
                      )
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CostItems;
