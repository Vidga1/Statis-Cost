import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLoadCost from '../hooks/useLoadCost';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { options, containerStyles } from '../components/statis/statCss';
import { processChartData } from '../components/statis/processChartData';
import { DateRange } from '../components/statis/DateRange';

ChartJS.register(...registerables);

const StatsPage = () => {
  const [searchParams] = useSearchParams();
  const { expenseRecords, incomeRecords } = useLoadCost();
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    const type =
      (searchParams.get('type') as 'expenses' | 'income') || 'expenses';
    const categoryId = searchParams.get('categoryId') || '';

    if (!categoryId) {
      setChartData({
        labels: [],
        datasets: [
          {
            label: type === 'expenses' ? 'Расходы' : 'Доходы',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
      return;
    }

    const recordsToProcess =
      type === 'expenses' ? expenseRecords : incomeRecords;

    // Проверяем, выбран ли диапазон дат с DatePicker
    if (startDate && endDate) {
      const newChartData = DateRange(
        recordsToProcess,
        type,
        categoryId,
        startDate,
        endDate,
      );
      setChartData(newChartData);
    } else {
      // Использовать processChartData для периода "неделя" или "месяц"
      const newChartData = processChartData(
        recordsToProcess,
        type,
        categoryId,
        period,
      );
      setChartData(newChartData);
    }
  }, [searchParams, expenseRecords, incomeRecords, startDate, endDate, period]);

  return (
    <div style={containerStyles}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <div style={{ marginRight: '1300px' }}>
          {' '}
          {/* Отступ для DatePicker */}
          <DatePicker
            placeholderText="Выбрать свой период"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update as [Date | null, Date | null]);
            }}
          />
        </div>
      </div>

      <h1 style={{ textAlign: 'center' }}>
        {' '}
        {/* Выравнивание заголовка по центру */}
        Статистика за{' '}
        {period === 'week' ? 'последнюю неделю' : 'последний месяц'}
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setPeriod('week')}>Неделя</button>
        <button onClick={() => setPeriod('month')}>Месяц</button>
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatsPage;
