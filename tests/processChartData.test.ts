import { processChartData } from '../src/components/statis/processChartData'; // Импортируйте функцию

describe('processChartData', () => {
  it('should aggregate expenses correctly for a week', () => {
    const records: ExpenseRecord[] = [
      {
        id: '1',
        categoryId: '1',
        date: new Date('2024-01-01'),
        totalExpense: 50,
      },
      {
        id: '2',
        categoryId: '1',
        date: new Date('2024-01-02'),
        totalExpense: 100,
      },
      {
        id: '3',
        categoryId: '2',
        date: new Date('2024-01-01'),
        totalExpense: 70,
      },
    ];
    const result = processChartData(records, 'expenses', '1', 'week');
    // Проверьте результаты
  });

  it('should aggregate income correctly for a month', () => {
    const records: IncomeRecord[] = [
      {
        id: '4',
        categoryId: '1',
        date: new Date('2024-01-10'),
        totalIncome: 200,
      },
      {
        id: '5',
        categoryId: '1',
        date: new Date('2024-01-20'),
        totalIncome: 300,
      },
      {
        id: '6',
        categoryId: '2',
        date: new Date('2024-01-15'),
        totalIncome: 500,
      },
    ];
    const result = processChartData(records, 'income', '1', 'month');
    // Проверьте результаты
  });

  it('should handle empty records array', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [];
    const result = processChartData(records, 'expenses', '1', 'week');
    // Проверьте результаты
  });

  it('should handle records with no matching category', () => {
    const records: ExpenseRecord[] = [
      {
        id: '7',
        categoryId: '2',
        date: new Date('2024-01-01'),
        totalExpense: 50,
      },
      {
        id: '8',
        categoryId: '3',
        date: new Date('2024-01-02'),
        totalExpense: 100,
      },
    ];
    const result = processChartData(records, 'expenses', '1', 'week');
    // Проверьте результаты
  });

  it('should not include records outside the specified week', () => {
    const records: ExpenseRecord[] = [
      {
        id: '9',
        categoryId: '1',
        date: new Date('2024-01-01'),
        totalExpense: 50,
      },
      {
        id: '10',
        categoryId: '1',
        date: new Date('2024-01-08'),
        totalExpense: 150,
      }, // Эта запись вне недели
    ];
    const result = processChartData(records, 'expenses', '1', 'week');
    // Проверьте, что запись за '2024-01-08' не включена в результат
  });

  it('should not include records outside the specified month', () => {
    const records: IncomeRecord[] = [
      {
        id: '11',
        categoryId: '1',
        date: new Date('2024-01-10'),
        totalIncome: 200,
      },
      {
        id: '12',
        categoryId: '1',
        date: new Date('2024-02-01'),
        totalIncome: 300,
      }, // Эта запись вне месяца
    ];
    const result = processChartData(records, 'income', '1', 'month');
  });

  it('should handle records with invalid dates', () => {
    const records: ExpenseRecord[] = [
      {
        id: '13',
        categoryId: '1',
        date: new Date('invalid-date'),
        totalExpense: 100,
      },
    ];
    const result = processChartData(records, 'expenses', '1', 'week');
  });

  it('should handle records with negative values', () => {
    const records: ExpenseRecord[] = [
      {
        id: '14',
        categoryId: '1',
        date: new Date('2024-01-01'),
        totalExpense: -50,
      },
    ];
    const result = processChartData(records, 'expenses', '1', 'week');
  });
});
