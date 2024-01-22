import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IncomeItem from '../src/components/cost/IncomeItem';

describe('IncomeItem', () => {
  it('отображает информацию о доходах и реагирует на удаление', () => {
    const mockOnRemove = jest.fn();
    const incomeData: IncomeRecord = {
      id: '1',
      categoryId: '1',
      date: new Date('2024-01-20'),
      totalIncome: 1000,
    };

    render(<IncomeItem record={incomeData} onRemove={mockOnRemove} />);

    expect(screen.getByText(/1000 рублей/)).toBeInTheDocument();
    expect(screen.getByText(/20 января 2024 г./)).toBeInTheDocument();

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });
});
