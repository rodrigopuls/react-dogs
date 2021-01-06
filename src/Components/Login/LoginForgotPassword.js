import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helpers/Error';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { FORGOT_PASSWORD_POST } from '../../ApiHelper';
import Head from '../Helpers/Head';

const LoginForgotPassword = () => {
  const login = useForm('email');

  const { data, request, error, loading } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = FORGOT_PASSWORD_POST({
        login: login.value,
        url: `${process.env.REACT_APP_HOST}/login/reset-password`,
      });
      await request(url, options);
    }
  }
  return (
    <section>
      <Head title="Forgot your password?" />
      <h1 className="title">Forgot your password?</h1>
      {data ? (
        <p className="alert alert-success">{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / User" type="text" name="login" {...login} />

          {loading ? (
            <Button disabled>Sending...</Button>
          ) : (
            <Button>Send Email</Button>
          )}

          <Error error={error} />
        </form>
      )}
    </section>
  );
};

export default LoginForgotPassword;
