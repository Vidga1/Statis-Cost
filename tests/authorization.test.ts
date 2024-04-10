import { login, createUser } from '../src/firebase/authorization';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { setUser } from '../src/store/slices/userSlice';
import * as firebaseService from '../src/firebase/firebaseService';
import * as reduxHooks from '../src/hooks/redux-hooks';
import * as routerDom from 'react-router-dom';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  };
});

jest.mock('../src/store/slices/userSlice', () => ({
  setUser: jest.fn(),
}));

jest.mock('../src/firebase/firebaseService', () => ({
  saveUserData: jest.fn(),
}));

jest.mock('../src/hooks/redux-hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Authentication Functions', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const email = 'test@example.com';
  const password = 'password123';
  const mockUser = {
    email,
    uid: '123',
    refreshToken: 'token123',
  };

  beforeEach(() => {
    jest
      .spyOn(reduxHooks, 'useAppDispatch')
      .mockImplementation(() => mockDispatch);
    jest.spyOn(routerDom, 'useNavigate').mockImplementation(() => mockNavigate);
    (getAuth as jest.Mock).mockReturnValue({});
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: mockUser,
    });
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  });

  test('login function authenticates and navigates', async () => {
    await login(email, password, mockDispatch, mockNavigate);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      email,
      password,
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      setUser({
        email: mockUser.email,
        id: mockUser.uid,
        token: mockUser.refreshToken,
      }),
    );
    expect(mockNavigate).toHaveBeenCalledWith('/settings');
  });

  test('createUser function registers user, saves data, and navigates', async () => {
    await createUser(email, password, mockDispatch, mockNavigate);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      {},
      email,
      password,
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      setUser({
        email: mockUser.email,
        id: mockUser.uid,
        token: mockUser.refreshToken,
      }),
    );
    expect(firebaseService.saveUserData).toHaveBeenCalledWith({
      email: mockUser.email,
      id: mockUser.uid,
      token: mockUser.refreshToken,
    });
    expect(mockNavigate).toHaveBeenCalledWith('/settings');
  });
});
