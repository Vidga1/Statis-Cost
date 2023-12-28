import React, { useEffect } from 'react';
import { SignUp } from '../components/auth/SignUp';
import NavigationBar from '../components/nav/NavigationBar';

const RegisterPage = () => {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <NavigationBar />
      <SignUp />
    </div>
  );
};

export default RegisterPage;
