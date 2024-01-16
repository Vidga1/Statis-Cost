import React from 'react';

const ExpenseItem: React.FC<ExpenseItemProps> = ({ record, onRemove }) => {
  return (
    <div className="total-expense">
      Сумма расходов {new Date(record.date).toLocaleDateString('ru-RU')}{' '}
      составляет {record.totalExpense} рублей.
      <button onClick={() => onRemove(record.id)} className="remove-button">
        x
      </button>
    </div>
  );
};

export default ExpenseItem;
