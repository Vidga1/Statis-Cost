import React, { useEffect } from 'react';
import { Login } from '../components/auth/Login';
import NavigationBar from '../components/nav/NavigationBar';

const LoginPage = () => {

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <NavigationBar />
      <Login />
    </div>
  );
};

export default LoginPage;
