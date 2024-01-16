import React from 'react';

const IncomeItem: React.FC<IncomeItemProps> = ({ record, onRemove }) => {
  const formattedDate = new Date(record.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="total-income">
      Доходы {formattedDate} {record.totalIncome} рублей.
      <button onClick={() => onRemove(record.id)} className="remove-button">
        x
      </button>
    </div>
  );
};

export default IncomeItem;
