import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignUp } from '../src/components/auth/SignUp';
import { useNavigate } from 'react-router-dom';
import * as firebaseAuth from 'firebase/auth';
import { useAppDispatch } from '../src/hooks/redux-hooks';

jest.mock('react-router-dom', () => ({ useNavigate: jest.fn() }));
jest.mock('../src/hooks/redux-hooks', () => ({ useAppDispatch: jest.fn() }));
jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn(() => ({})),
    createUserWithEmailAndPassword: jest.fn(),
  };
});
jest.mock('../src/firebase/firebaseService');

describe('SignUp Component', () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  const mockCreateUserWithEmailAndPassword = jest.spyOn(
    firebaseAuth,
    'createUserWithEmailAndPassword',
  );
  beforeEach(() => {
    // Очистка моков
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
    (firebaseAuth.getAuth as jest.Mock).mockClear(); // Очистка мока getAuth
    mockCreateUserWithEmailAndPassword.mockClear();
    mockNavigate.mockClear();
    mockDispatch.mockClear();
  });
  test('renders correctly', () => {
    render(<SignUp />);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });
  test('successful registration', async () => {
    const mockUser: firebaseAuth.User = {
      email: 'test@example.com',
      uid: '123',
      refreshToken: 'token',
      emailVerified: false,
      isAnonymous: false,
      providerData: [],
      metadata: { creationTime: '', lastSignInTime: '' },
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'token',
      getIdTokenResult: async () => ({
        token: 'token',
        expirationTime: '',
        authTime: '',
        issuedAtTime: '',
        signInProvider: null,
        signInSecondFactor: null,
        claims: {},
      }),
      reload: async () => {},
      toJSON: () => {
        return {};
      },
      displayName: null,
      phoneNumber: null,
      photoURL: null,
      providerId: 'firebase',
    };
    mockCreateUserWithEmailAndPassword.mockResolvedValue({
      user: mockUser,
      providerId: 'firebase',
      operationType: 'signIn',
    });
    render(<SignUp />);
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password',
      );
      expect(mockDispatch).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/settings');
    });
  });
  test('registration failure', async () => {
    mockCreateUserWithEmailAndPassword.mockRejectedValue(
      new Error('Registration failed'),
    );
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText(/register/i));
    await waitFor(() => {
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password',
      );
    });
  });
});
