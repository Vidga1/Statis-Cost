import { useAppDispatch, useAppSelector } from '../src/hooks/redux-hooks';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useAppDispatch and useAppSelector hooks', () => {
  test('useAppDispatch should return dispatch function', () => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
    const dispatch = useAppDispatch();
    expect(typeof dispatch).toBe('function'); // Измененная проверка
  });

  it('useAppSelector should return a slice of state', () => {
    const testState = {
      user: {
        isAuth: true,
        email: 'test@example.com',
        token: 'testToken',
        id: 'testId',
      },
      categories: {
        /* ваше состояние категорий, например: */
        items: [],
      },
      // Другие части вашего глобального состояния, если они есть
    };
    (useSelector as unknown as jest.Mock).mockImplementation((callback) =>
      callback(testState),
    );
    const selectedUser = useAppSelector((state) => state.user);
    expect(selectedUser).toEqual(testState.user);
  });
});
