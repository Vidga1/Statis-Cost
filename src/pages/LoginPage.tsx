import React, { useEffect } from 'react';
import { Login } from '../components/auth/Login';
import { Link } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = () => {
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

    // При демонтировании компонента
    return () => {
      document.body.style.background = '';
    };
  }, []);

  return (
    <div>
      <h1>
        Войти или{' '}
        <Link to="/register">регистрация (пароль не менее 6 символов)</Link>
      </h1>
      <Login />
    </div>
  );
};

export default LoginPage;
