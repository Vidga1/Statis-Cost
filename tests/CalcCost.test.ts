import {
  handleExpenseChange,
  handleSubcategoryExpenseChange,
  handleDateChange,
  calculateTotalExpense,
  handleSaveExpense,
  handleRemoveExpense,
  handleRemoveIncome,
  handleSaveIncome,
  calculateTotalIncome,
} from '../src/components/cost/CalcCost'; // путь к вашему модулю

describe('Expense and Income Handling Functions', () => {
  it('should call setCategoryExpenses with updated expenses', () => {
    const mockSetCategoryExpenses = jest.fn();
    handleExpenseChange(mockSetCategoryExpenses, '1', '100');
    expect(mockSetCategoryExpenses).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should call setSubcategoryExpenses with updated expenses', () => {
    const mockSetSubcategoryExpenses = jest.fn();
    handleSubcategoryExpenseChange(mockSetSubcategoryExpenses, '1-1', '50');
    expect(mockSetSubcategoryExpenses).toHaveBeenCalledWith(
      expect.any(Function),
    );
  });

  it('should calculate total expense correctly', () => {
    const categoryExpenses = { '1': 100 };
    const subcategoryExpenses = { '1-1': 50, '1-2': 25 };
    const total = calculateTotalExpense(
      categoryExpenses,
      subcategoryExpenses,
      '1',
    );
    expect(total).toBe(175);
  });

  it('should add a new expense record', () => {
    const mockSetExpenseRecords = jest.fn();
    const expenseRecords: never[] = [];
    const categoryExpenses = { '1': 100 };
    const subcategoryExpenses = { '1-1': 50 };
    const categoryDates = { '1': new Date() };

    handleSaveExpense(
      mockSetExpenseRecords,
      expenseRecords,
      '1',
      categoryDates,
      calculateTotalExpense,
      categoryExpenses,
      subcategoryExpenses,
    );

    expect(mockSetExpenseRecords).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should remove an expense record', () => {
    const mockSetExpenseRecords = jest.fn();
    const expenseRecords = [
      { id: '123', categoryId: '1', date: new Date(), totalExpense: 150 },
    ];
    handleRemoveExpense(
      mockSetExpenseRecords,
      expenseRecords,
      '123',
      'user1',
      jest.fn(),
    );
    expect(mockSetExpenseRecords).toHaveBeenCalledWith([]);
  });
  it('should call setCategoryDates with updated dates', () => {
    const mockSetCategoryDates = jest.fn();
    const newDate = new Date(2020, 1, 1);
    handleDateChange(mockSetCategoryDates, '1', newDate);
    expect(mockSetCategoryDates).toHaveBeenCalledWith(expect.any(Function));
  });

  // Тест для calculateTotalIncome
  it('should calculate total income correctly', () => {
    const categoryExpenses = { '1': 200 };
    const subcategoryExpenses = { '1-1': 100, '1-2': 50 };
    const total = calculateTotalIncome(
      categoryExpenses,
      subcategoryExpenses,
      '1',
    );
    expect(total).toBe(350);
  });

  // Тест для handleSaveIncome
  it('should add a new income record', () => {
    const mockSetIncomeRecords = jest.fn();
    const incomeRecords: IncomeRecord[] = [];
    const categoryExpenses = { '1': 200 };
    const subcategoryExpenses = { '1-1': 100 };
    const categoryDates = { '1': new Date() };

    handleSaveIncome(
      mockSetIncomeRecords,
      incomeRecords,
      '1',
      categoryDates,
      calculateTotalIncome,
      categoryExpenses,
      subcategoryExpenses,
    );

    expect(mockSetIncomeRecords).toHaveBeenCalledWith(expect.any(Array));
  });

  // Тест для handleRemoveIncome
  it('should remove an income record', () => {
    const mockSetIncomeRecords = jest.fn();
    const incomeRecords = [
      { id: '123', categoryId: '1', date: new Date(), totalIncome: 250 },
    ];
    handleRemoveIncome(
      mockSetIncomeRecords,
      incomeRecords,
      '123',
      'user1',
      jest.fn(),
    );
    expect(mockSetIncomeRecords).toHaveBeenCalledWith([]);
  });
  it('should remove an expense record', () => {
    const mockSetExpenseRecords = jest.fn();
    const expenseRecords = [
      { id: '123', categoryId: '1', date: new Date(), totalExpense: 150 },
    ];
    handleRemoveExpense(
      mockSetExpenseRecords,
      expenseRecords,
      '123',
      'user1',
      jest.fn(),
    );
    expect(mockSetExpenseRecords).toHaveBeenCalledWith([]);
  });
});
