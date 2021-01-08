import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';

import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';

import styles from './LoginForm.module.css';
import stylesBtn from '../../Components/Forms/Button.module.css';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Sign-In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button>Sign In</Button>
        )}
        <Error error={error && "We couldn't sign you in. Please try again."} />
      </form>
      <Link className={styles.forgot} to="/login/forgot-password">
        Forgot Password?
      </Link>

      <div className={styles.createAccount}>
        <h2 className={styles.subtitle}>Create Account</h2>
        <p>New to Dogs?</p>
        <Link className={stylesBtn.button} to="/login/create-account">
          Join Dogs
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
