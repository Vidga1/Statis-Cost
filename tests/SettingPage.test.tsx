import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingPage from '../src/pages/SettingPage';
import { useAuth } from '../src/hooks/use-auth';
import { useAppDispatch } from '../src/hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

// Создаем моки
jest.mock('../src/hooks/use-auth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../src/hooks/redux-hooks', () => ({
  useAppDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SettingPage', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      email: 'user@test.com',
      id: '123',
    });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders correctly', () => {
    const { getByText } = render(<SettingPage />);
    expect(getByText('Добро пожаловать, user@test.com!')).toBeInTheDocument();
  });

  it('handles logout', () => {
    const { getByText } = render(<SettingPage />);
    const logoutButton = getByText('Выйти');
    fireEvent.click(logoutButton);
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
