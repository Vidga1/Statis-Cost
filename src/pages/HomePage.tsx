import React, { useEffect } from 'react';
import NavigationBar from '../components/nav/NavigationBar';

const HomePage = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.backgroundImage =
      "url('https://catherineasquithgallery.com/uploads/posts/2021-02/1613586623_21-p-foni-dlya-finansovikh-prezentatsii-25.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';

    return () => {
      document.body.style.background = '';
    };
  }, []);
  return (
    <div>
      <NavigationBar />
      <h1 style={{ 
        padding: '35px', 
        color: '#022140', 
        fontSize: '36px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' 
      }}>
        Добро пожаловать в приложение для управления<br/>
        <hr style={{ width: '50%', margin: 'auto', border: 'none' }}/>
        личными финансами и отслеживания расходов!
      </h1>
    </div>
  );
};

export default HomePage;