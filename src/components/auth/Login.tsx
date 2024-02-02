import React from 'react';
import { Form } from './Form';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { login } from '../../firebase/authorization';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Form
      title="sign in"
      handleClick={(email, password) =>
        login(email, password, dispatch, navigate)
      }
    />
  );
};

export { Login };
