import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLoadCost from '../hooks/useLoadCost';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(...registerables);

type ChartDataType = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

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

  const containerStyles: React.CSSProperties = {
    height: '600px',
    width: '1800px',
    marginTop: '80px',
    marginLeft: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'linear-gradient(180deg, rgba(255, 165, 0, 0.8), rgba(128, 0, 128, 0.8))',
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    padding: '20px',
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        offset: true,
        ticks: {
          color: 'gold',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          textStrokeColor: 'black',
          textStrokeWidth: 3,
        },
        afterFit: (scaleInstance: { height: number }) => {
          scaleInstance.height = scaleInstance.height * 2.2;
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#fff',
        },
      },
    },
    elements: {
      point: {
        radius: 5,
      },
      line: {
        tension: 0.4,
      },
    },
  };

  type RecordType = 'expenses' | 'income';
  type CategoryRecord = ExpenseRecord | IncomeRecord;

  const processChartData = useCallback(
    (
      records: CategoryRecord[],
      type: RecordType,
      categoryId: string,
    ): ChartDataType => {
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // Установка времени на начало дня
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
