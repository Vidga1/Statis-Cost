import React from 'react';
import { useNavigate } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CostItems from '../src/components/cost/CostItems';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('<CostItems />', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Router>
        <CostItems
          categories={[{ id: 1, name: 'Category 1', subcategories: [] }]}
          categoryExpenses={{ '1': 0 }}
          subcategoryExpenses={{}}
          categoryDates={{ '1': new Date() }}
          expenseRecords={[]}
          incomeRecords={[]}
          setCategoryExpenses={jest.fn()}
          setSubcategoryExpenses={jest.fn()}
          setCategoryDates={jest.fn()}
          setExpenseRecords={jest.fn()}
          setIncomeRecords={jest.fn()}
          userId="user-123"
          saveUserExpenses={jest.fn()}
          saveUserIncomes={jest.fn()}
        />
      </Router>,
    );

    expect(getByText('Category 1')).toBeInTheDocument();
    expect(getByText('Добавить Расход')).toBeInTheDocument();
    expect(getByText('Добавить Доход')).toBeInTheDocument();
  });
  it('updates category expense on input change', () => {
    const setCategoryExpenses = jest.fn();
    const { getByPlaceholderText } = render(
      <Router>
        <CostItems
          categories={[{ id: 1, name: 'Category 1', subcategories: [] }]}
          categoryExpenses={{ '1': 0 }}
          subcategoryExpenses={{}}
          categoryDates={{ '1': new Date() }}
          expenseRecords={[]}
          incomeRecords={[]}
          setCategoryExpenses={setCategoryExpenses}
          setSubcategoryExpenses={jest.fn()}
          setCategoryDates={jest.fn()}
          setExpenseRecords={jest.fn()}
          setIncomeRecords={jest.fn()}
          userId="user-123"
          saveUserExpenses={jest.fn()}
          saveUserIncomes={jest.fn()}
        />
      </Router>,
    );

    fireEvent.change(getByPlaceholderText('Введите сумму'), {
      target: { value: '100' },
    });
    expect(setCategoryExpenses).toHaveBeenCalled();
  });

  it('updates category date on date change', () => {
    const setCategoryDates = jest.fn();
    const { getByPlaceholderText } = render(
      <Router>
        <CostItems
          categories={[{ id: 1, name: 'Category 1', subcategories: [] }]}
          categoryExpenses={{ '1': 0 }}
          subcategoryExpenses={{}}
          categoryDates={{ '1': new Date() }}
          expenseRecords={[]}
          incomeRecords={[]}
          setCategoryExpenses={jest.fn()}
          setSubcategoryExpenses={jest.fn()}
          setCategoryDates={setCategoryDates}
          setExpenseRecords={jest.fn()}
          setIncomeRecords={jest.fn()}
          userId="user-123"
          saveUserExpenses={jest.fn()}
          saveUserIncomes={jest.fn()}
        />
      </Router>,
    );

    fireEvent.change(getByPlaceholderText('Выберите дату'), {
      target: { value: new Date('2021-01-01') },
    });
    expect(setCategoryDates).toHaveBeenCalled();
  });

  it('adds a new expense record on button click', () => {
    const setExpenseRecords = jest.fn();
    const { getByText } = render(
      <Router>
        <CostItems
          categories={[{ id: 1, name: 'Category 1', subcategories: [] }]}
          categoryExpenses={{ '1': 0 }}
          subcategoryExpenses={{}}
          categoryDates={{ '1': new Date() }}
          expenseRecords={[]}
          incomeRecords={[]}
          setCategoryExpenses={jest.fn()}
          setSubcategoryExpenses={jest.fn()}
          setCategoryDates={jest.fn()}
          setExpenseRecords={setExpenseRecords}
          setIncomeRecords={jest.fn()}
          userId="user-123"
          saveUserExpenses={jest.fn()}
          saveUserIncomes={jest.fn()}
        />
      </Router>,
    );

    fireEvent.click(getByText('Добавить Расход'));
    expect(setExpenseRecords).toHaveBeenCalled();
  });

  it('adds a new income record on button click', () => {
    const setIncomeRecords = jest.fn();
    const { getByText } = render(
      <Router>
        <CostItems
          categories={[{ id: 1, name: 'Category 1', subcategories: [] }]}
          categoryExpenses={{ '1': 0 }}
          subcategoryExpenses={{}}
          categoryDates={{ '1': new Date() }}
          expenseRecords={[]}
          incomeRecords={[]}
          setCategoryExpenses={jest.fn()}
          setSubcategoryExpenses={jest.fn()}
          setCategoryDates={jest.fn()}
          setExpenseRecords={jest.fn()}
          setIncomeRecords={setIncomeRecords}
          userId="user-123"
          saveUserExpenses={jest.fn()}
          saveUserIncomes={jest.fn()}
        />
      </Router>,
    );

    fireEvent.click(getByText('Добавить Доход'));
    expect(setIncomeRecords).toHaveBeenCalled();
  });
});
