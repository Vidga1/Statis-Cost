import React from 'react';
import { SignUp } from '../components/SignUp';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <div>
            <h1>Зарегестрироваться или уже есть аккаунт? <Link to="/login">Войти</Link> </h1>
            <SignUp />       
        </div>
    )
}

export default RegisterPage
