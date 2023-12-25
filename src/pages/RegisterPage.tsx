import React, { useEffect } from 'react';
import { SignUp } from '../components/auth/SignUp';
import { Link } from 'react-router-dom';
import './AuthPages.css';

const RegisterPage = () => {
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
        Зарегестрироваться или уже есть аккаунт? <Link to="/login">Войти</Link>{' '}
      </h1>
      <SignUp />
    </div>
  );
};

export default RegisterPage;
