import React, { useEffect } from 'react';
import { SignUp } from '../components/auth/SignUp';
import NavigationBar from '../components/nav/NavigationBar';

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
    
    return () => {
      document.body.style.background = '';
    };
  }, []);
  return (
    <div>
      <NavigationBar />
      <SignUp />
    </div>
  );
};

export default RegisterPage;
