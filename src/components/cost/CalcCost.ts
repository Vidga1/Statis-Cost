import { v4 as uuidv4 } from 'uuid';

export const handleExpenseChange = (
  setCategoryExpenses: React.Dispatch<React.SetStateAction<CategoryExpenses>>,
  categoryId: string,
  value: string,
) => {
  setCategoryExpenses((prevExpenses) => ({
    ...prevExpenses,
    [categoryId]: Number(value),
  }));
};

export const handleSubcategoryExpenseChange = (
  setSubcategoryExpenses: React.Dispatch<
    React.SetStateAction<SubcategoryExpenses>
  >,
  key: string,
  value: string,
) => {
  setSubcategoryExpenses((prevExpenses) => ({
    ...prevExpenses,
    [key]: Number(value),
  }));
};

export const handleDateChange = (
  setCategoryDates: React.Dispatch<React.SetStateAction<CategoryDates>>,
  categoryId: string,
  date: Date | null,
) => {
  setCategoryDates((prevDates) => ({
    ...prevDates,
    [categoryId]: date,
  }));
};

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
  categoryExpenses: CategoryExpenses, // Возможно, у вас есть отдельный тип для доходов
  subcategoryExpenses: SubcategoryExpenses,
  categoryId: string,
): number => {
  const categoryIncome = categoryExpenses[categoryId] || 0;
  const subcategoryIncome = Object.keys(subcategoryExpenses)
    .filter((key) => key.startsWith(`${categoryId}-`))
    .reduce((sum, key) => sum + (subcategoryExpenses[key] || 0), 0);
  return categoryIncome + subcategoryIncome;
};

export const handleSaveExpense = (
  setExpenseRecords: React.Dispatch<React.SetStateAction<ExpenseRecord[]>>,
  expenseRecords: ExpenseRecord[],
  categoryId: string,
  categoryDates: CategoryDates,
  calculateTotalExpense: (
    categoryExpenses: CategoryExpenses,
    subcategoryExpenses: SubcategoryExpenses,
    categoryId: string,
  ) => number,
  categoryExpenses: CategoryExpenses,
  subcategoryExpenses: SubcategoryExpenses,
) => {
  const date = categoryDates[categoryId];
  if (date) {
    const totalExpense = calculateTotalExpense(
      categoryExpenses,
      subcategoryExpenses,
      categoryId,
    );
    setExpenseRecords([
      ...expenseRecords,
      { id: uuidv4(), categoryId, date, totalExpense },
    ]);
  }
};

export const handleSaveIncome = (
  setIncomeRecords: React.Dispatch<React.SetStateAction<IncomeRecord[]>>,
  incomeRecords: IncomeRecord[],
  categoryId: string,
  categoryDates: CategoryDates,
  calculateTotalIncome: (
    categoryExpenses: CategoryExpenses,
    subcategoryExpenses: SubcategoryExpenses,
    categoryId: string,
  ) => number,
  categoryExpenses: CategoryExpenses,
  subcategoryExpenses: SubcategoryExpenses,
) => {
  const date = categoryDates[categoryId];
  if (date) {
    const totalIncome = calculateTotalIncome(
      categoryExpenses,
      subcategoryExpenses,
      categoryId,
    );
    setIncomeRecords([
      ...incomeRecords,
      { id: uuidv4(), categoryId, date, totalIncome },
    ]);
  }
};

export const handleRemoveIncome = (
  setIncomeRecords: React.Dispatch<React.SetStateAction<IncomeRecord[]>>,
  incomeRecords: IncomeRecord[],
  recordId: string,
) => {
  setIncomeRecords(incomeRecords.filter((record) => record.id !== recordId));
};

export const handleRemoveExpense = (
  setExpenseRecords: React.Dispatch<React.SetStateAction<ExpenseRecord[]>>,
  expenseRecords: ExpenseRecord[],
  recordId: string,
) => {
  setExpenseRecords(expenseRecords.filter((record) => record.id !== recordId));
};
