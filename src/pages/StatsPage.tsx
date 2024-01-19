import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLoadCost from '../hooks/useLoadCost';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { options, containerStyles } from '../components/statis/statCss';
import { processChartData } from '../components/statis/processChartData';

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
    const newChartData = processChartData(
      recordsToProcess,
      type,
      categoryId,
      period,
    );
    setChartData(newChartData);
  }, [searchParams, expenseRecords, incomeRecords, period]);

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
