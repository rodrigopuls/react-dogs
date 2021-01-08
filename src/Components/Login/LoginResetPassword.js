import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helpers/Error';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { RESET_PASSWORD_POST } from '../../ApiHelper';
import { useNavigate } from 'react-router-dom';
import Head from '../Helpers/Head';

const LoginResetPassword = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');

  const password = useForm('password');
  const { request, error, loading } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (key && login && password.validate()) {
      const { url, options } = RESET_PASSWORD_POST({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Reset your password" />
      <h1 className="title">Reset your password</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="New Password"
          type="password"
          name="password"
          {...password}
        />

        {loading ? (
          <Button disabled>Resetting...</Button>
        ) : (
          <Button>Reset Password</Button>
        )}

        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginResetPassword;
