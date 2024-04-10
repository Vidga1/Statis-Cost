import React, { useEffect } from 'react';
import NavigationBar from '../components/nav/NavigationBar';

const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <h1
        style={{
          padding: '35px',
          color: '#022140',
          fontSize: '36px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Добро пожаловать в приложение для управления
        <br />
        <hr style={{ width: '50%', margin: 'auto', border: 'none' }} />
        личными финансами и отслеживания расходов!
      </h1>
    </div>
  );
};

export default HomePage;
