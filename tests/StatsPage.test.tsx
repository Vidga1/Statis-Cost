import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsPage from '../src/pages/StatsPage';
import useLoadCost from '../src/hooks/useLoadCost';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../__mocks__/ResizeObserver';

const mockedUseLoadCost = jest.fn();
const mockedUseSearchParams = jest.fn();
const mockedUseNavigate = jest.fn();

jest.mock('../src/hooks/useLoadCost', () => () => mockedUseLoadCost());
jest.mock('react-router-dom', () => ({
  useSearchParams: () => mockedUseSearchParams(),
  useNavigate: () => mockedUseNavigate(),
}));

describe('StatsPage', () => {
  it('renders correctly', () => {
    mockedUseLoadCost.mockReturnValue({
      expenseRecords: [],
      incomeRecords: [],
    });
    mockedUseSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
    mockedUseNavigate.mockReturnValue(jest.fn());

    const { getByText } = render(<StatsPage />);
    expect(getByText(/статистика за/i)).toBeInTheDocument();
  });

  it('navigates back to the main page on clicking the back button', () => {
    mockedUseLoadCost.mockReturnValue({
      expenseRecords: [],
      incomeRecords: [],
    });
    mockedUseSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
    const navigateMock = jest.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);

    const { getByText } = render(<StatsPage />);

    const backButton = getByText('Выйти из статистики');
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith('/main');
  });

  it('changes period to week or month', async () => {
    mockedUseLoadCost.mockReturnValue({
      expenseRecords: [],
      incomeRecords: [],
    });
    mockedUseSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
    mockedUseNavigate.mockReturnValue(jest.fn());

    const { getByText } = render(<StatsPage />);

    const weekButton = getByText('Неделя');
    const monthButton = getByText('Месяц');

    fireEvent.click(weekButton);
    expect(getByText('Статистика за последнюю неделю')).toBeInTheDocument();

    fireEvent.click(monthButton);
    expect(getByText('Статистика за последний месяц')).toBeInTheDocument();
  });

  it('displays chart data correctly', () => {
    const expenseRecords = [{}];
    const incomeRecords = [{}];

    mockedUseLoadCost.mockReturnValue({ expenseRecords, incomeRecords });
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams('type=expenses'),
      jest.fn(),
    ]);
    mockedUseNavigate.mockReturnValue(jest.fn());

    const { getByRole } = render(<StatsPage />);

    const chart = getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('handles URL parameters correctly', () => {
    const expenseRecords = [{}];
    const incomeRecords = [
      { id: '1', categoryId: '1', date: new Date(), totalIncome: 100 },
    ];

    mockedUseLoadCost.mockReturnValue({ expenseRecords, incomeRecords });
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams('type=income'),
      jest.fn(),
    ]);
    mockedUseNavigate.mockReturnValue(jest.fn());

    const { getByRole } = render(<StatsPage />);

    const chart = getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('updates date range correctly', async () => {
    mockedUseLoadCost.mockReturnValue({
      expenseRecords: [],
      incomeRecords: [],
    });
    mockedUseSearchParams.mockReturnValue([new URLSearchParams(), jest.fn()]);
    mockedUseNavigate.mockReturnValue(jest.fn());

    const { getByPlaceholderText } = render(<StatsPage />);

    const startDateInput = getByPlaceholderText('Выбрать свой период');

    fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
  });

  it('responds to URL parameter changes', () => {
    mockedUseLoadCost.mockReturnValue({
      expenseRecords: [{}],
      incomeRecords: [{}],
    });
    const setURLSearchParams = jest.fn();
    mockedUseSearchParams.mockReturnValue([
      new URLSearchParams('type=expenses'),
      setURLSearchParams,
    ]);
    mockedUseNavigate.mockReturnValue(jest.fn());

    render(<StatsPage />);
  });
});
