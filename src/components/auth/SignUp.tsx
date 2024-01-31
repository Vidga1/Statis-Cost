import React from 'react';
import { Form } from './Form';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../firebase/authorization';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Form
      title="register"
      handleClick={(email, password) =>
        createUser(email, password, dispatch, navigate)
      }
    />
  );
};

export { SignUp };
