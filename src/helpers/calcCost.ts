import { v4 as uuidv4 } from 'uuid';

export const handleExpenseChange = (
  prevExpenses: CategoryExpenses,
  categoryId: string,
  value: string,
): CategoryExpenses => ({
  ...prevExpenses,
  [categoryId]: Number(value),
});

export const handleSubcategoryExpenseChange = (
  prevExpenses: SubcategoryExpenses,
  key: string,
  value: string,
): SubcategoryExpenses => ({
  ...prevExpenses,
  [key]: Number(value),
});

export const handleDateChange = (
  prevDates: CategoryDates,
  categoryId: string,
  date: Date | null,
): CategoryDates => ({
  ...prevDates,
  [categoryId]: date || new Date(),
});

export const calculateTotalExpense = (
  categoryExpenses: CategoryExpenses,
  subcategoryExpenses: SubcategoryExpenses,
  categoryId: string,
): number => {
  const categoryExpense = categoryExpenses[categoryId] || 0;
  const subcategoryExpense = Object.keys(subcategoryExpenses)
    .filter((key) => key.startsWith(`${categoryId}-`))
    .reduce((sum, key) => sum + subcategoryExpenses[key], 0);
  return categoryExpense + subcategoryExpense;
};

export const calculateTotalIncome = (
  categoryExpenses: CategoryExpenses,
  subcategoryExpenses: SubcategoryExpenses,
  categoryId: string,
): number => {
  const categoryIncome = categoryExpenses[categoryId] || 0;
  const subcategoryIncome = Object.keys(subcategoryExpenses)
    .filter((key) => key.startsWith(`${categoryId}-`))
    .reduce((sum, key) => sum + (subcategoryExpenses[key] || 0), 0);
  return categoryIncome + subcategoryIncome;
};

export const saveExpenseRecord = (
  expenseRecords: ExpenseRecord[],
  categoryId: string,
  categoryDates: CategoryDates,
  calculateTotal: (
    categoryExpenses: CategoryExpenses,
    subcategoryExpenses: SubcategoryExpenses,
    categoryId: string,
  ) => number,
  categoryExpenses: CategoryExpenses,
  subcategoryExpenses: SubcategoryExpenses,
): ExpenseRecord[] => {
  const date = categoryDates[categoryId];
  if (!date) return expenseRecords;

  const totalExpense = calculateTotal(
    categoryExpenses,
    subcategoryExpenses,
    categoryId,
  );
  return [...expenseRecords, { id: uuidv4(), categoryId, date, totalExpense }];
};

export const saveIncomeRecord = (
  incomeRecords: IncomeRecord[],
  categoryId: string,
  categoryDates: CategoryDates,
  calculateTotal: (
    categoryExpenses: CategoryExpenses,
    subcategoryExpenses: SubcategoryExpenses,
    categoryId: string,
  ) => number,
  categoryExpenses: CategoryExpenses,
  subcategoryExpenses: SubcategoryExpenses,
): IncomeRecord[] => {
  const date = categoryDates[categoryId];
  if (!date) return incomeRecords;

  const totalIncome = calculateTotal(
    categoryExpenses,
    subcategoryExpenses,
    categoryId,
  );
  return [...incomeRecords, { id: uuidv4(), categoryId, date, totalIncome }];
};

export const removeIncomeRecord = (
  incomeRecords: IncomeRecord[],
  recordId: string,
): IncomeRecord[] => {
  return incomeRecords.filter((record) => record.id !== recordId);
};

export const removeExpenseRecord = (
  expenseRecords: ExpenseRecord[],
  recordId: string,
): ExpenseRecord[] => {
  return expenseRecords.filter((record) => record.id !== recordId);
};
