import React from 'react';
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import CostItems from '../components/cost/CostItems';
import useLoadCost from '../hooks/useLoadCost';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/settings');
  };
  const {
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
  } = useLoadCost();

  return (
    <div className="main-container">
      <button className="backButton" onClick={handleBackClick}>Назад</button>
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
