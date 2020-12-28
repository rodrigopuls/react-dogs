import React from 'react';

import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helpers/Error';
import { USER_POST } from '../../ApiHelper';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && email.validate() && password.validate()) {
      const { url, options } = USER_POST({
        username: username.value,
        email: email.value,
        password: password.value,
      });
      const response = await fetch(url, options);
      if (response.ok) userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Username" type="text" name="username" {...username} />
        <Input label="Email" type="text" name="email" {...email} />
        <Input label="Password" type="password" name="password" {...password} />

        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button>Create</Button>
        )}

        <Error message={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
