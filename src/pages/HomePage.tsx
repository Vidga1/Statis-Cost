import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';
import './AuthPages.css'

const HomePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuth, email } = useAuth();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/login');
    }

    return (
        <div>
            <h1>Добро пожаловать!</h1>
            {email && (
                <button 
                    className="logoutButton" 
                    onClick={handleLogout}
                >
                    Выйти из {email}
                </button>
            )}
        </div>
    );
};

export default HomePage;
