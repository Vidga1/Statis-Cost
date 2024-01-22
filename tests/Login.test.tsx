import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from '../src/components/auth/Login';
import { useNavigate } from 'react-router-dom';
import * as firebaseAuth from 'firebase/auth';
import { useAppDispatch } from '../src/hooks/redux-hooks';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../src/hooks/redux-hooks', () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock('firebase/auth');

describe('Login Component', () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  const mockSignInWithEmailAndPassword = jest.spyOn(
    firebaseAuth,
    'signInWithEmailAndPassword',
  );

  beforeEach(() => {
    window.alert = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (useAppDispatch as jest.Mock).mockImplementation(() => mockDispatch);
    mockSignInWithEmailAndPassword.mockClear();
    mockNavigate.mockClear();
    mockDispatch.mockClear();
  });

  test('renders correctly', () => {
    render(<Login />);
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('successful login', async () => {
    const mockUser: firebaseAuth.User = {
      email: 'test@example.com',
      uid: '123',
      refreshToken: 'token',
      emailVerified: false,
      isAnonymous: false,
      providerData: [],
      metadata: { creationTime: '', lastSignInTime: '' },
      tenantId: 'tenantId',
      delete: async () => {},
      getIdToken: async () => 'token',
      getIdTokenResult: function (
        forceRefresh?: boolean | undefined,
      ): Promise<firebaseAuth.IdTokenResult> {
        throw new Error('Function not implemented.');
      },
      reload: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      },
      displayName: null,
      phoneNumber: null,
      photoURL: null,
      providerId: '',
    };

    mockSignInWithEmailAndPassword.mockResolvedValue({
      user: mockUser,
      providerId: 'firebase',
      operationType: 'signIn',
    });

    render(<Login />);
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'user/setUser',
        payload: {
          email: mockUser.email,
          id: mockUser.uid,
          token: mockUser.refreshToken,
        },
      });
      expect(mockNavigate).toHaveBeenCalledWith('/settings');
    });
  });

  test('login failure', async () => {
    mockSignInWithEmailAndPassword.mockRejectedValue(
      new Error('Invalid user!'),
    );

    render(<Login />);
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalled();
    });
  });
});
