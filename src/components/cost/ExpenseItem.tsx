import React from 'react';

const ExpenseItem: React.FC<ExpenseItemProps> = ({ record, onRemove }) => {
  const formattedDate = new Date(record.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="total-expense">
      Расходы {formattedDate} {record.totalExpense} рублей.
      <button onClick={() => onRemove(record.id)} className="remove-button">
        x
      </button>
    </div>
  );
};

export default ExpenseItem;
