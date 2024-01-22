import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CostItems from '../src/components/cost/CostItems';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockCategories = [
  {
    id: 1,
    name: 'Категория 1',
    subcategories: [{ id: 1, name: 'Подкатегория 1' }],
  },
];

const mockExpenseRecords: ExpenseRecord[] = [
  {
    id: '1',
    categoryId: '1',
    date: new Date('2024-01-01'),
    totalExpense: 500,
  },
];

const mockIncomeRecords: IncomeRecord[] = [
  {
    id: '2',
    categoryId: '1',
    date: new Date('2024-01-01'),
    totalIncome: 1000,
  },
];

const defaultProps = {
  categories: mockCategories,
  categoryExpenses: { '1': 500 },
  subcategoryExpenses: { '1-1': 200 },
  categoryDates: { '1': new Date('2024-01-01') },
  expenseRecords: mockExpenseRecords,
  incomeRecords: mockIncomeRecords,
  setCategoryExpenses: jest.fn(),
  setSubcategoryExpenses: jest.fn(),
  setCategoryDates: jest.fn(),
  setExpenseRecords: jest.fn(),
  setIncomeRecords: jest.fn(),
  userId: 'user1',
  saveUserExpenses: jest.fn(),
  saveUserIncomes: jest.fn(),
};

describe('CostItems', () => {
  it('отображает компонент с предоставленными данными', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    expect(screen.getByText('Категория 1')).toBeInTheDocument();
    expect(screen.getByText('Подкатегория 1')).toBeInTheDocument();
    expect(screen.getByText('Расход')).toBeInTheDocument();
    expect(screen.getByText('Доход')).toBeInTheDocument();
  });
  it('проверяет функциональность кнопки сохранения расходов', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    const expenseButton = screen.getByText('Расход');
    fireEvent.click(expenseButton);
    expect(defaultProps.setExpenseRecords).toHaveBeenCalled();
  });
  it('проверяет функциональность кнопки сохранения доходов', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    const incomeButton = screen.getByText('Доход');
    fireEvent.click(incomeButton);
    expect(defaultProps.setIncomeRecords).toHaveBeenCalled();
  });
  it('отображает и обрабатывает записи о расходах', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    const expenseAmount = new RegExp('500', 'i');
    expect(screen.getByText(expenseAmount)).toBeInTheDocument();
    const removeExpenseButton = screen.getAllByText('x')[0];
    fireEvent.click(removeExpenseButton);
    expect(defaultProps.setExpenseRecords).toHaveBeenCalled();
  });

  it('отображает и обрабатывает записи о доходах', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    const incomeAmount = new RegExp('1000', 'i');
    expect(screen.getByText(incomeAmount)).toBeInTheDocument();
    const removeIncomeButton = screen.getAllByText('x')[1];
    fireEvent.click(removeIncomeButton);
    expect(defaultProps.setIncomeRecords).toHaveBeenCalled();
  });

  it('отображает все категории и подкатегории', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    defaultProps.categories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
      category.subcategories.forEach((subcategory) => {
        expect(screen.getByText(subcategory.name)).toBeInTheDocument();
      });
    });
  });

  it('вызывает функцию при изменении суммы расходов', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    const input = screen.getAllByPlaceholderText(
      'Введите сумму',
    )[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: '300' } });
    // Проверка вызова функции, если она должна быть вызвана при изменении
    expect(defaultProps.setCategoryExpenses).toHaveBeenCalled();
  });

  it('отображает DatePicker и обрабатывает изменение даты', () => {
    render(
      <MemoryRouter>
        <CostItems {...defaultProps} />
      </MemoryRouter>,
    );
    const datePicker = screen.getByPlaceholderText(
      'Выберите дату',
    ) as HTMLInputElement;
    expect(datePicker).toBeInTheDocument();
    fireEvent.change(datePicker, { target: { value: '2024-01-02' } });
    expect(datePicker.value).toBe('2024-01-02');
  });
});
