import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from '../src/components/auth/Form';

describe('Form', () => {
  test('renders the form inputs and button', () => {
    render(<Form title="Войти" handleClick={jest.fn()} />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  test('allows entering an email and password', () => {
    render(<Form title="Войти" handleClick={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });
    expect(screen.getByPlaceholderText(/email/i)).toHaveValue(
      'test@example.com',
    );
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue('password123');
  });

  test('calls handleClick with email and password when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<Form title="Войти" handleClick={handleClick} />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /войти/i }));
    expect(handleClick).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
