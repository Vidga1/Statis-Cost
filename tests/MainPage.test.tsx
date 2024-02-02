import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import MainPage from '../src/pages/MainPage';
import { BrowserRouter as Router } from 'react-router-dom';
import useLoadCost from '../src/hooks/useLoadCost';

jest.mock('react-router-dom', () => {
  const actualReactRouterDom = jest.requireActual('react-router-dom');
  return {
    ...actualReactRouterDom,
    useNavigate: jest.fn(),
  };
});
jest.mock('../src/hooks/useLoadCost');

const mockedUseLoadCost = jest.mocked(useLoadCost);

describe('MainPage Component Tests', () => {
  it('should display not authenticated message when user is not authenticated', () => {
    mockedUseLoadCost.mockReturnValue({
      userId: null,
      categories: [],
      categoryExpenses: {},
      setCategoryExpenses: jest.fn(),
      subcategoryExpenses: {},
      setSubcategoryExpenses: jest.fn(),
      categoryDates: {},
      setCategoryDates: jest.fn(),
      expenseRecords: [],
      setExpenseRecords: jest.fn(),
      incomeRecords: [],
      setIncomeRecords: jest.fn(),
      saveUserExpenses: jest.fn(),
      saveUserIncomes: jest.fn(),
    });

    render(
      <Router>
        <MainPage />
      </Router>,
    );

    expect(
      screen.getByText('Пользователь не аутентифицирован'),
    ).toBeInTheDocument();
  });

  it('should render CostItems with correct props', () => {
    const testProps = {
      userId: 'user-id',
      categories: [],
      categoryExpenses: {},
      setCategoryExpenses: jest.fn(),
      subcategoryExpenses: {},
      setSubcategoryExpenses: jest.fn(),
      categoryDates: {},
      setCategoryDates: jest.fn(),
      expenseRecords: [],
      setExpenseRecords: jest.fn(),
      incomeRecords: [],
      setIncomeRecords: jest.fn(),
      saveUserExpenses: jest.fn(),
      saveUserIncomes: jest.fn(),
    };

    mockedUseLoadCost.mockReturnValue(testProps);

    render(
      <Router>
        <MainPage />
      </Router>,
    );
  });
});
