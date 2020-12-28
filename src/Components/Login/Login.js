import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginForgotPassword from './LoginForgotPassword';
import LoginResetPassword from './LoginResetPassword';

import styles from './Login.module.css';

import { UserContext } from '../../UserContext';

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create-account" element={<LoginCreate />} />
          <Route path="forgot-password" element={<LoginForgotPassword />} />
          <Route path="reset-password" element={<LoginResetPassword />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
