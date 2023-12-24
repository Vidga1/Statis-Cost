import React from 'react';
import { Login } from '../components/auth/Login';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div>
            <h1>Войти или <Link to="/register">регистрация (пароль не менее 6 символов)</Link></h1>
            <Login />
        </div>
    )
}

export default LoginPage
