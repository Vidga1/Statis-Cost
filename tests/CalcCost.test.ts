import {
  handleExpenseChange,
  handleSubcategoryExpenseChange,
  handleDateChange,
  calculateTotalExpense,
  calculateTotalIncome,
  saveExpenseRecord,
  saveIncomeRecord,
  removeIncomeRecord,
  removeExpenseRecord,
} from '../src/helpers/calcCost';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 'unique-id'),
  };
});

describe('CalcCost functions', () => {
  describe('handleExpenseChange', () => {
    it('updates the expense for a given category', () => {
      const prevExpenses = { '1': 100 };
      const newExpenses = handleExpenseChange(prevExpenses, '1', '200');
      expect(newExpenses['1']).toEqual(200);
    });
  });

  describe('handleSubcategoryExpenseChange', () => {
    it('updates the expense for a given subcategory', () => {
      const prevExpenses = { '1-1': 50 };
      const newExpenses = handleSubcategoryExpenseChange(
        prevExpenses,
        '1-1',
        '100',
      );
      expect(newExpenses['1-1']).toEqual(100);
    });
  });

  describe('handleDateChange', () => {
    it('updates the date for a given category', () => {
      const prevDates = { '1': new Date('2020-01-01') };
      const newDate = new Date('2020-02-01');
      const newDates = handleDateChange(prevDates, '1', newDate);
      expect(newDates['1']).toEqual(newDate);
    });
  });

  describe('calculateTotalExpense', () => {
    it('calculates total expenses for a category including its subcategories', () => {
      const categoryExpenses = { '1': 100 };
      const subcategoryExpenses = { '1-1': 50, '1-2': 50 };
      const total = calculateTotalExpense(
        categoryExpenses,
        subcategoryExpenses,
        '1',
      );
      expect(total).toEqual(200);
    });
  });

  describe('calculateTotalIncome', () => {
    it('calculates total income for a category including its subcategories', () => {
      const categoryExpenses = { '1': 100 };
      const subcategoryExpenses = { '1-1': 50, '1-2': 50 };
      const total = calculateTotalIncome(
        categoryExpenses,
        subcategoryExpenses,
        '1',
      );
      expect(total).toEqual(200);
    });
  });

  describe('saveExpenseRecord', () => {
    it('adds a new expense record', () => {
      const expenseRecords: ExpenseRecord[] = [];
      const categoryExpenses = { '1': 100 };
      const subcategoryExpenses = { '1-1': 50 };
      const categoryDates = { '1': new Date('2020-01-01') };
      const newRecords = saveExpenseRecord(
        expenseRecords,
        '1',
        categoryDates,
        calculateTotalExpense,
        categoryExpenses,
        subcategoryExpenses,
      );
      expect(newRecords.length).toEqual(1);
      expect(newRecords[0]).toEqual(
        expect.objectContaining({
          id: 'unique-id',
          categoryId: '1',
          totalExpense: 150,
        }),
      );
    });
  });

  describe('saveIncomeRecord', () => {
    it('adds a new income record', () => {
      const incomeRecords: IncomeRecord[] = [];
      const categoryExpenses = { '1': 100 };
      const subcategoryExpenses = { '1-1': 50 };
      const categoryDates = { '1': new Date('2020-01-01') };
      const newRecords = saveIncomeRecord(
        incomeRecords,
        '1',
        categoryDates,
        calculateTotalIncome,
        categoryExpenses,
        subcategoryExpenses,
      );
      expect(newRecords.length).toEqual(1);
      expect(newRecords[0]).toEqual(
        expect.objectContaining({
          id: 'unique-id',
          categoryId: '1',
          totalIncome: 150,
        }),
      );
    });
  });

  describe('removeIncomeRecord', () => {
    it('removes an income record by id', () => {
      const incomeRecords = [
        {
          id: 'unique-id',
          categoryId: '1',
          date: new Date(),
          totalIncome: 100,
        },
      ];
      const updatedRecords = removeIncomeRecord(incomeRecords, 'unique-id');
      expect(updatedRecords.length).toEqual(0);
    });
  });

  describe('removeExpenseRecord', () => {
    it('removes an expense record by id', () => {
      const expenseRecords = [
        {
          id: 'unique-id',
          categoryId: '1',
          date: new Date(),
          totalExpense: 100,
        },
      ];
      const updatedRecords = removeExpenseRecord(expenseRecords, 'unique-id');
      expect(updatedRecords.length).toEqual(0);
    });
  });
});
