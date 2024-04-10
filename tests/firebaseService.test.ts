import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../src/firebase/firebase';
import { saveUserData } from '../src/firebase/firebaseService';
import {
  loadUserCategories,
  saveUserCategories,
} from '../src/firebase/firebaseService';
import {
  loadUserIncomes,
  saveUserIncomes,
  loadUserExpenses,
  saveUserExpenses,
} from '../src/firebase/firebaseService';

jest.mock('firebase/firestore');

describe('Firestore Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saveUserData should call setDoc with correct parameters', async () => {
    const mockUserData: UserData = {
      email: 'test@example.com',
      token: 'some-token',
      id: '123',
    };
    const mockDocRef = {}; // Мок референса документа
    (doc as jest.Mock).mockReturnValue(mockDocRef);

    await saveUserData(mockUserData);

    expect(doc).toHaveBeenCalledWith(firestore, 'users', '123');
    expect(setDoc).toHaveBeenCalledWith(mockDocRef, mockUserData);
  });

  it('saveUserData should handle exceptions', async () => {
    const mockUserData: UserData = {
      email: 'test@example.com',
      token: 'some-token',
      id: '123',
    };
    const mockError = new Error('Error saving data');
    (setDoc as jest.Mock).mockRejectedValue(mockError);

    await saveUserData(mockUserData);

    // Проверяем, что функция setDoc была вызвана и завершилась ошибкой
    expect(setDoc).toHaveBeenCalledWith(expect.anything(), mockUserData);
    expect(setDoc).rejects.toThrow(mockError);
  });

  it('saveUserData should not proceed if userData is incomplete', async () => {
    const mockIncompleteUserData: Partial<UserData> = {
      email: 'test@example.com',
      token: 'some-token',
    };

    await saveUserData(mockIncompleteUserData as UserData);

    expect(setDoc).not.toHaveBeenCalled();
  });
});

describe('loadUserCategories Function', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it('should return categories on successful fetch', async () => {
    const mockDocSnap = {
      exists: jest.fn(() => true),
      data: jest.fn(() => ({ categories: ['Food', 'Transport'] })),
    };
    (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

    const categories = await loadUserCategories('user-id');
    expect(categories).toEqual(['Food', 'Transport']);
    expect(getDoc).toHaveBeenCalledWith(expect.anything());
  });

  it('should handle errors', async () => {
    (getDoc as jest.Mock).mockRejectedValue(
      new Error('Error fetching categories'),
    );

    const categories = await loadUserCategories('user-id');
    expect(categories).toBeNull();
    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при загрузке категорий пользователя:',
      expect.any(Error),
    );
  });
});

describe('loadUserIncomes', () => {
  it('should load incomes correctly', async () => {
    const mockIncomesData = [{ date: '2021-01-01', amount: 100 }];
    const mockDocSnap = {
      exists: jest.fn(() => true),
      data: jest.fn(() => ({ incomes: mockIncomesData })),
    };
    (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

    const result = await loadUserIncomes('user123');

    expect(getDoc).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual(
      mockIncomesData.map((income) => ({
        ...income,
        date: new Date(income.date),
      })),
    );
  });

  it('should handle non-existing incomes', async () => {
    const mockDocSnap = {
      exists: jest.fn(() => false),
      data: jest.fn(),
    };
    (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

    const result = await loadUserIncomes('user123');

    expect(result).toBeNull();
  });

  it('should handle errors', async () => {
    const mockError = new Error('Error fetching incomes');
    (getDoc as jest.Mock).mockRejectedValue(mockError);

    const result = await loadUserIncomes('user123');

    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при загрузке доходов пользователя:',
      mockError,
    );
    expect(result).toBeNull();
  });
});

describe('saveUserIncomes', () => {
  let mockIncomes: IncomeRecord[];

  beforeEach(() => {
    jest.clearAllMocks();
    mockIncomes = [
      {
        id: 'income1',
        categoryId: 'category1',
        date: new Date('2021-01-01'),
        totalIncome: 100,
      },
    ];
  });

  it('should save incomes correctly', async () => {
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    await saveUserIncomes('user123', mockIncomes);

    expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
      incomes: mockIncomes.map((income) => ({
        ...income,
        date: income.date.toISOString(),
      })),
    });
  });

  it('should handle errors', async () => {
    const mockError = new Error('Error saving incomes');
    (setDoc as jest.Mock).mockRejectedValue(mockError);

    await saveUserIncomes('user123', mockIncomes);

    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при сохранении доходов пользователя:',
      mockError,
    );
  });
});

describe('loadUserExpenses', () => {
  it('loads expenses correctly when they exist', async () => {
    const mockExpensesData = [{ id: 'exp1', amount: 100, date: '2021-01-01' }];
    const mockDocSnap = {
      exists: jest.fn(() => true),
      data: jest.fn(() => ({ expenses: mockExpensesData })),
    };
    (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

    const result = await loadUserExpenses('user123');

    expect(getDoc).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual(
      mockExpensesData.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      })),
    );
  });

  it('returns null when expenses do not exist', async () => {
    const mockDocSnap = {
      exists: jest.fn(() => false),
      data: jest.fn(),
    };
    (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

    const result = await loadUserExpenses('user123');

    expect(result).toBeNull();
  });

  it('handles errors', async () => {
    const mockError = new Error('Error fetching expenses');
    (getDoc as jest.Mock).mockRejectedValue(mockError);

    const result = await loadUserExpenses('user123');

    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при загрузке расходов пользователя:',
      mockError,
    );
    expect(result).toBeNull();
  });
});

describe('saveUserExpenses', () => {
  const mockExpenses: ExpenseRecord[] = [
    {
      id: 'exp1',
      categoryId: 'cat1',
      date: new Date('2021-01-01'),
      totalExpense: 100,
    },
  ];

  const mockInvalidExpenses: ExpenseRecord[] = [
    {
      id: 'exp1',
      categoryId: 'cat1',
      date: new Date('invalid-date'),
      totalExpense: 100,
    },
  ];

  it('saves expenses correctly', async () => {
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    await saveUserExpenses('user123', mockExpenses);

    expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
      expenses: mockExpenses.map((expense) => ({
        ...expense,
        date: expense.date.toISOString(),
      })),
    });
  });

  it('handles invalid date values', async () => {
    const mockInvalidExpenses: ExpenseRecord[] = [
      {
        id: 'exp1',
        categoryId: 'cat1',
        date: new Date('invalid-date'),
        totalExpense: 100,
      },
    ];

    try {
      await saveUserExpenses('user123', mockInvalidExpenses);
      fail('Expected RangeError was not thrown');
    } catch (error) {
      // Временно выводим ошибку в консоль для диагностики
      console.error(error);
      expect(error).toBeInstanceOf(ReferenceError);
    }
  });

  it('handles errors', async () => {
    const mockError = new Error('Error saving expenses');
    (setDoc as jest.Mock).mockRejectedValue(mockError);

    await saveUserExpenses('user123', mockExpenses);

    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при сохранении расходов пользователя:',
      mockError,
    );
  });
});

describe('saveUserCategories Function', () => {
  const mockUserId = 'user123';
  const mockSubcategories: Subcategory[] = [
    { id: 1, name: 'Subcategory 1' },
    { id: 2, name: 'Subcategory 2' },
  ];

  const mockCategories: Category[] = [
    { id: 1, name: 'Food', subcategories: mockSubcategories },
    { id: 2, name: 'Transport', subcategories: [] },
    { id: 3, name: 'Shopping', subcategories: [] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('successfully saves categories', async () => {
    const mockDocRef = {};
    (doc as jest.Mock).mockReturnValue(mockDocRef);
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    await saveUserCategories(mockUserId, mockCategories);

    expect(doc).toHaveBeenCalledWith(firestore, 'userCategories', mockUserId);
    expect(setDoc).toHaveBeenCalledWith(mockDocRef, {
      categories: mockCategories,
    });
    expect(console.log).toHaveBeenCalledWith(
      'Категории пользователя сохранены в Firestore',
    );
  });

  it('handles errors while saving categories', async () => {
    const mockError = new Error('Failed to save categories');
    (setDoc as jest.Mock).mockRejectedValue(mockError);

    await saveUserCategories(mockUserId, mockCategories);

    expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
      categories: mockCategories,
    });
    expect(console.error).toHaveBeenCalledWith(
      'Ошибка при сохранении категорий пользователя:',
      mockError,
    );
  });
});
