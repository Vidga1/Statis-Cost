import { renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../src/hooks/use-auth';

jest.mock('react-redux', () => ({
  useSelector: jest
    .fn()
    .mockImplementation((selector) => selector(mockedState)),
  useDispatch: () => jest.fn(),
}));

// Предположим, что это ваше мокированное состояние
const mockedState = {
  user: {
    isAuth: true,
    email: 'test@example.com',
    token: 'testToken',
    id: 'testId',
  },
};

test('useAuth should return user authentication details', () => {
  const { result } = renderHook(() => useAuth());

  expect(result.current.isAuth).toBeTruthy();
  expect(result.current.email).toBe('test@example.com');
  expect(result.current.token).toBe('testToken');
  expect(result.current.id).toBe('testId');
});
