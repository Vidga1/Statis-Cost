import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseItem from '../src/components/cost/ExpenseItem';

describe('ExpenseItem', () => {
  it('отображает информацию о расходах и реагирует на удаление', () => {
    const mockOnRemove = jest.fn();
    const expenseData: ExpenseRecord = {
      id: '2',
      categoryId: '2',
      date: new Date('2024-01-21'),
      totalExpense: 500,
    };

    render(<ExpenseItem record={expenseData} onRemove={mockOnRemove} />);

    expect(screen.getByText(/500 рублей/)).toBeInTheDocument();
    expect(screen.getByText(/21 января 2024 г./)).toBeInTheDocument();

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith('2');
  });
});
