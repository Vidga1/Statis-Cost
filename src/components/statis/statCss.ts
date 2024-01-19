import { CSSProperties } from 'react';

export const containerStyles: React.CSSProperties = {
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

  export const options = {
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