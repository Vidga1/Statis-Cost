import { renderHook, act } from '@testing-library/react-hooks';
import useLoadCost from '../src/hooks/useLoadCost';
import * as reduxHooks from '../src/hooks/redux-hooks';
import * as firebaseService from '../src/firebase/firebaseService';

jest.mock('../src/hooks/redux-hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../src/firebase/firebaseService', () => ({
  loadUserCategories: jest.fn(),
  loadUserExpenses: jest.fn(),
  loadUserIncomes: jest.fn(),
  saveUserExpenses: jest.fn(),
  saveUserIncomes: jest.fn(),
}));

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mocked-uuid'),
}));

describe('useLoadCost', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch data and update state accordingly', async () => {
    const mockDispatch = jest.fn();
    (
      reduxHooks.useAppDispatch as jest.MockedFunction<
        typeof reduxHooks.useAppDispatch
      >
    ).mockReturnValue(mockDispatch);

    (
      reduxHooks.useAppSelector as jest.MockedFunction<
        typeof reduxHooks.useAppSelector
      >
    ).mockImplementation((callback) =>
      callback({
        user: {
          email: 'test@example.com',
          token: 'testToken',
          id: 'testUserId',
        },
        categories: {
          categoriesByUserId: {},
        },
        _persist: {
          version: 1,
          rehydrated: true,
        },
      }),
    );

    const userId = 'testUserId';
    const mockCategories = [{ id: 1, name: 'Category 1' }];
    const mockExpenses = [
      { id: 'e1', categoryId: 'c1', date: new Date(), totalExpense: 100 },
    ];
    const mockIncomes = [
      { id: 'i1', categoryId: 'c1', date: new Date(), totalIncome: 150 },
    ];

    (firebaseService.loadUserCategories as jest.Mock).mockResolvedValue(
      mockCategories,
    );
    (firebaseService.loadUserExpenses as jest.Mock).mockResolvedValue(
      mockExpenses,
    );
    (firebaseService.loadUserIncomes as jest.Mock).mockResolvedValue(
      mockIncomes,
    );

    const { result, waitForNextUpdate } = renderHook(() => useLoadCost(), {
      initialProps: { useAuth: () => ({ id: userId }) },
    });

    await waitForNextUpdate();

    expect(result.current.categories).toEqual([]);
    expect(result.current.expenseRecords).toEqual(
      mockExpenses.map((e) => ({ ...e, id: expect.any(String) })),
    );
    expect(result.current.incomeRecords).toEqual(
      mockIncomes.map((i) => ({ ...i, id: expect.any(String) })),
    );
    expect(mockDispatch).toHaveBeenCalled();
  });
});
