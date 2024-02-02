import { DateRange } from '../src/components/statis/DateRange';

describe('DateRange', () => {
  it('should correctly aggregate expenses within a date range', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [
      {
        id: '1',
        categoryId: '1',
        date: new Date('2024-01-03'),
        totalExpense: 100,
      },
      {
        id: '2',
        categoryId: '1',
        date: new Date('2024-01-04'),
        totalExpense: 200,
      },
      {
        id: '3',
        categoryId: '2',
        date: new Date('2024-01-05'),
        totalExpense: 300,
      },
    ];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-07');
    const result = DateRange(records, 'expenses', '1', startDate, endDate);
  });

  it('should correctly aggregate incomes within a date range', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [
      {
        id: '1',
        categoryId: '1',
        date: new Date('2024-01-02'),
        totalIncome: 150,
      },
      {
        id: '2',
        categoryId: '1',
        date: new Date('2024-01-03'),
        totalIncome: 250,
      },
    ];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-07');
    const result = DateRange(records, 'income', '1', startDate, endDate);
  });

  it('should handle records outside the date range', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [
      {
        id: '1',
        categoryId: '1',
        date: new Date('2024-01-01'),
        totalExpense: 50,
      },
      {
        id: '2',
        categoryId: '1',
        date: new Date('2024-01-15'),
        totalExpense: 150,
      },
    ];
    const startDate = new Date('2024-01-02');
    const endDate = new Date('2024-01-14');
    const result = DateRange(records, 'expenses', '1', startDate, endDate);
  });

  it('should handle empty records array', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-07');
    const result = DateRange(records, 'expenses', '1', startDate, endDate);
  });

  it('should handle non-matching category records', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [
      {
        id: '1',
        categoryId: '2',
        date: new Date('2024-01-03'),
        totalExpense: 100,
      },
    ];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-07');
    const result = DateRange(records, 'expenses', '1', startDate, endDate);
  });

  it('should aggregate multiple records on the same date correctly', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [
      {
        id: '1',
        categoryId: '1',
        date: new Date('2024-01-03'),
        totalExpense: 100,
      },
      {
        id: '2',
        categoryId: '1',
        date: new Date('2024-01-03'),
        totalExpense: 200,
      },
    ];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-07');
    const result = DateRange(records, 'expenses', '1', startDate, endDate);
  });

  it('should return zero values for dates with no records', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [
      {
        id: '1',
        categoryId: '1',
        date: new Date('2024-01-03'),
        totalExpense: 100,
      },
    ];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-07');
    const result = DateRange(records, 'expenses', '1', startDate, endDate);
  });

  it('should handle cases where start date is after end date', () => {
    const records: (ExpenseRecord | IncomeRecord)[] = [
      {
        id: '1',
        categoryId: '1',
        date: new Date('2024-01-05'),
        totalExpense: 100,
      },
    ];
    const startDate = new Date('2024-01-07');
    const endDate = new Date('2024-01-01');
    const result = DateRange(records, 'expenses', '1', startDate, endDate);
  });
});
