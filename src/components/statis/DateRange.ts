export const DateRange = (
  records: (ExpenseRecord | IncomeRecord)[],
  type: 'expenses' | 'income',
  categoryId: string,
  startDate: Date,
  endDate: Date,
): ChartDataType => {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const aggregatedData: { [key: string]: number } = {};

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toLocaleDateString('ru-RU');
    aggregatedData[dateKey] = 0;
  }

  records.forEach((record) => {
    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);
    if (
      record.categoryId === categoryId &&
      recordDate >= startDate &&
      recordDate <= endDate
    ) {
      const dateKey = recordDate.toLocaleDateString('ru-RU');
      const value =
        type === 'expenses'
          ? (record as ExpenseRecord).totalExpense
          : (record as IncomeRecord).totalIncome;
      aggregatedData[dateKey] += value;
    }
  });

  return {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: type === 'expenses' ? 'Расходы' : 'Доходы',
        data: Object.values(aggregatedData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
};
