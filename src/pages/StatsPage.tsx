import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLoadCost from '../hooks/useLoadCost';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
Chart.register(...registerables);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const StatsPage = () => {
  const [searchParams] = useSearchParams();
  const { expenseRecords, incomeRecords } = useLoadCost();
  const [chartData, setChartData] = useState<ChartData>({
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

  const chartRef = useRef(null);

  const containerStyles: React.CSSProperties = {
    height: '600px',
    width: '1800px',
    marginTop: '30px',
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
        ticks: {
          color: 'gold',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          textStrokeColor: 'black',
          textStrokeWidth: 3,
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
    onResize: (chart: Chart) => {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 99, 132, 0.2)');
      gradient.addColorStop(1, 'rgba(75, 192, 192, 0.2)');
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    },
  };

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  const processChartData = useCallback(
    (
      records: ExpenseRecord[] | IncomeRecord[],
      type: 'expenses' | 'income',
    ): ChartData => {
      const aggregatedData: { [key: string]: number } = {};

      records.forEach((record) => {
        const formattedDate = record.date.toLocaleDateString('ru-RU');

        if (!aggregatedData[formattedDate]) {
          aggregatedData[formattedDate] = 0;
        }

        const amount =
          type === 'expenses'
            ? (record as ExpenseRecord).totalExpense
            : (record as IncomeRecord).totalIncome;
        aggregatedData[formattedDate] = amount;
      });

      return {
        labels: Object.keys(aggregatedData).sort(),
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
    [],
  );

  useEffect(() => {
    const type = searchParams.get('type') || 'expenses';
    const recordsToProcess =
      type === 'expenses' ? expenseRecords : incomeRecords;
    const newChartData = processChartData(
      recordsToProcess,
      type as 'expenses' | 'income',
    );
    setChartData(newChartData);
  }, [searchParams, expenseRecords, incomeRecords, processChartData]);

  return (
    <div style={containerStyles}>
      <h1>Статистика за последнюю неделю</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatsPage;
