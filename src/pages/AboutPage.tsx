import React, { useEffect } from 'react';
import NavigationBar from '../components/nav/NavigationBar';

const AboutPage = () => {
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
<div style={{ textAlign: 'center' }}>
  <NavigationBar />
  <h1 style={{ 
  fontSize: '32px', 
  color: '#022140',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
}}>
  О проекте
</h1>

  <div style={{
    color: '#4B0082', 
    backgroundColor: 'white', 
    border: '1px solid #ccc', 
    padding: '15px', 
    width: '60%',
    fontSize: '25px',
    margin: '20px auto', 
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' 
  }}>
    <p>
      Проект Учёт Расходов - это прототип приложения для эффективного управления личными финансами. Разработанный с использованием React и Firebase, этот инструмент позволяет пользователям вводить, отслеживать и анализировать свои ежедневные расходы.
    </p>

    <p>
      Особенностью приложения является его способность управлять категориями и подкатегориями расходов, обеспечивая тем самым детализированное учёт затрат.
    </p>

    <p>
      Ключевые особенности:<br/>
      - Категории и подкатегории расходов: Пользователи могут создавать категории и подкатегории для организации своих расходов.<br/>
      - Учёт расходов по датам: Возможность вносить расходы по датам в конкретные категории или подкатегории.<br/>
      - Сводка расходов: Автоматический расчёт суммарных расходов в категориях и подкатегориях.<br/>
      - Гибкий просмотр данных: Функция просмотра расходов за день, неделю, месяц или выбранный период времени в виде таблиц или диаграмм.
    </p>

    <p>
      В процессе разработки этого приложения основное внимание уделяется использованию библиотек, клиентскому роутингу в React, а также авторизации и безопасности через Firebase.
    </p>

    <p>
      Цель проекта - предоставить пользователям простой и удобный способ контроля за личными финансами, улучшая их финансовое планирование и управление бюджетом.
    </p>
  </div>
</div>
);
};

export default AboutPage;