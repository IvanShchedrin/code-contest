import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { initUser } from 'store/user/userSlice';
import { updateApp } from 'store/app/appSlice';
import { selectUser } from 'store/user/selectors';

const LoginComponent = ({ initUser, updateApp }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleAuth = (resp) => {
    initUser(resp.data);
    updateApp({ step: 'waiting' });
    setLoading(false);
  };

  useEffect(() => {
    axios.post('/api/signin')
      .then(handleAuth)
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/signup', {
      name: event.currentTarget.name.value,
      passPhrase: event.currentTarget.passphrase.value,
    })
      .then(handleAuth)
      .catch(() => {
        setError(true);
      })
  };

  return loading ? (
    <>
      Loading...
    </>
  ) : (
    <>
      <p>
        Привет и добро пожаловать на frontend quiz!
        <br />
        <br />
        Пройди короткую авторизацию и присоединяйся, будет интересно 😉
        <br />
        <br />
      </p>
      <form onSubmit={handleSubmit}>
        <input style={{ background: error && 'red' }} type="text" name="name" placeholder="name" required />
        <input type="text" name="passphrase" placeholder="admin pass phrase" />
        <button type="submit">Поехали!</button>
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: selectUser(state),
});

const mapDispatchToProps = {
  initUser,
  updateApp,
};

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
