import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLoadCost from '../hooks/useLoadCost';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { options, containerStyles } from '../components/statis/statCss';
import { processChartData } from '../components/statis/processChartData';
import { DateRange } from '../components/statis/DateRange';

ChartJS.register(...registerables);

const StatsPage = () => {
  const navigate = useNavigate();
  const BackButton = () => {
    navigate('/main');
  };
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

  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
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
      setIsCustomDateRange(false);
      return;
    }

    const recordsToProcess =
      type === 'expenses' ? expenseRecords : incomeRecords;

    if (startDate && endDate) {
      const newChartData = DateRange(
        recordsToProcess,
        type,
        categoryId,
        startDate,
        endDate,
      );
      setChartData(newChartData);
      setIsCustomDateRange(true);
    } else {
      const newChartData = processChartData(
        recordsToProcess,
        type,
        categoryId,
        period,
      );
      setChartData(newChartData);
      setIsCustomDateRange(false);
    }
  }, [searchParams, expenseRecords, incomeRecords, startDate, endDate, period]);

  return (
    <div style={containerStyles}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginRight: '1400px',
        }}
      >
        <button className="backButton" onClick={BackButton}>
          Выйти из статистики
        </button>
        <DatePicker
          placeholderText="Выбрать свой период"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update as [Date | null, Date | null]);
          }}
        />
        <button
          onClick={() => {
            setDateRange([null, null]);
            setIsCustomDateRange(false);
          }}
          style={{ marginLeft: '10px' }}
        >
          Сброс
        </button>
      </div>

      <h1 style={{ textAlign: 'center' }}>
        {isCustomDateRange
          ? 'Статистика за выбранный период'
          : 'Статистика за ' +
            (period === 'week' ? 'последнюю неделю' : 'последний месяц')}
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            setPeriod('week');
            setIsCustomDateRange(false);
          }}
        >
          Неделя
        </button>
        <button
          onClick={() => {
            setPeriod('month');
            setIsCustomDateRange(false);
          }}
        >
          Месяц
        </button>
      </div>

      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatsPage;
