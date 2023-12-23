import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { removeUser } from '../store/slices/userSlice';
import { useAppDispatch } from '../hooks/redux-hooks';

const HomePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {isAuth, email} = useAuth();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={() => dispatch(removeUser())}>Log out from {email}</button>
        </div>
    );
};

export default HomePage;
