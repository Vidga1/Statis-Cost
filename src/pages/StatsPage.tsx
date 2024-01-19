import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLoadCost from '../hooks/useLoadCost';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {options, containerStyles } from '../components/statis/statCss'

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

  const processChartData = useCallback(
    (
      records: CategoryRecord[],
      type: RecordType,
      categoryId: string,
    ): ChartDataType => {
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0); 
      const endDate = new Date();
      if (period === 'month') {
        endDate.setMonth(startDate.getMonth() + 1);
      } else {
        endDate.setDate(startDate.getDate() + 6);
      }
      endDate.setHours(0, 0, 0, 0);

      const aggregatedData: { [key: string]: number } = {};

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const dateKey = d.toLocaleDateString('ru-RU');
        aggregatedData[dateKey] = 0;
      }

      records.forEach((record) => {
        const recordDate = new Date(record.date);
        recordDate.setHours(0, 0, 0, 0);
        if (
          record.categoryId === categoryId &&
          recordDate >= startDate &&
          recordDate <= endDate
        ) {
          const dateKey = recordDate.toLocaleDateString('ru-RU');
          const value =
            type === 'expenses'
              ? (record as ExpenseRecord).totalExpense
              : (record as IncomeRecord).totalIncome;
          aggregatedData[dateKey] += value;
        }
      });

      return {
        labels: Object.keys(aggregatedData),
        datasets: [
          {
            label: type === 'expenses' ? 'Расходы' : 'Доходы',
            data: Object.values(aggregatedData),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    },
    [period],
  );

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
    const newChartData = processChartData(recordsToProcess, type, categoryId);
    setChartData(newChartData);
  }, [searchParams, expenseRecords, incomeRecords, processChartData, period]);

  return (
    <div style={containerStyles}>
      <h1>
        Статистика за{' '}
        {period === 'week' ? 'последнюю неделю' : 'последний месяц'}
      </h1>
      <button onClick={() => setPeriod('week')}>Неделя</button>
      <button onClick={() => setPeriod('month')}>Месяц</button>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatsPage;
