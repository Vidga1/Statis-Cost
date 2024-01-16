import React from 'react';

const IncomeItem: React.FC<IncomeItemProps> = ({ record, onRemove }) => {
  return (
    <div className="total-income">
      Сумма доходов {new Date(record.date).toLocaleDateString('ru-RU')}{' '}
      составляет {record.totalIncome} рублей.
      <button onClick={() => onRemove(record.id)} className="remove-button">
        x
      </button>
    </div>
  );
};

export default IncomeItem;
