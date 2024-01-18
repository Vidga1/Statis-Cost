import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExpenseItem from './ExpenseItem';
import IncomeItem from './IncomeItem';

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
} from './CalcCost';

type CostItemsProps = {
  categories: Category[];
  categoryExpenses: { [key: string]: number };
  subcategoryExpenses: { [key: string]: number };
  categoryDates: { [key: string]: Date | null };
  expenseRecords: ExpenseRecord[];
  incomeRecords: IncomeRecord[];
  setCategoryExpenses: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setSubcategoryExpenses: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setCategoryDates: React.Dispatch<
    React.SetStateAction<{ [key: string]: Date | null }>
  >;
  setExpenseRecords: React.Dispatch<React.SetStateAction<ExpenseRecord[]>>;
  setIncomeRecords: React.Dispatch<React.SetStateAction<IncomeRecord[]>>;
};

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
}) => {
  const resetInputs = () => {
    setCategoryExpenses({});
    setSubcategoryExpenses({});
  };
  return (
    <>
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
                onClick={() => {
                  handleSaveExpense(
                    setExpenseRecords,
                    expenseRecords,
                    String(category.id),
                    categoryDates,
                    calculateTotalExpense,
                    categoryExpenses,
                    subcategoryExpenses,
                  );
                  resetInputs();
                }}
              >
                Расход
              </button>
              <button
                onClick={() => {
                  handleSaveIncome(
                    setIncomeRecords,
                    incomeRecords,
                    String(category.id),
                    categoryDates,
                    calculateTotalIncome,
                    categoryExpenses,
                    subcategoryExpenses,
                  );
                  resetInputs();
                }}
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
          <div className="expenses-incomes-container">
            <div className="expenses-container">
            <div className="expenses-header">
            Расходы
            <button>Расходы за неделю</button>
          </div>
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
            </div>
            <div className="incomes-container">
            <div className="incomes-header">
            Доходы
            <button>Доходы за неделю</button>
          </div>
              {incomeRecords
                .filter((record) => record.categoryId === String(category.id))
                .map((record) => (
                  <IncomeItem
                    key={record.id}
                    record={record}
                    onRemove={() =>
                      handleRemoveIncome(
                        setIncomeRecords,
                        incomeRecords,
                        record.id,
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
