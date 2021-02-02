import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Space, Input, Button } from 'antd';

import { initUser } from 'store/user/userSlice';
import { updateApp } from 'store/app/appSlice';
import { selectUser } from 'store/user/selectors';

const LoginComponent = ({ initUser, updateApp }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showPassPhrase, setShowPassPhrase] = useState(false);

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
      passPhrase: event.currentTarget.passphrase?.value,
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
      <h1>Привет и&nbsp;добро&nbsp;пожаловать на&nbsp;frontend&nbsp;quiz!</h1>
      <h3 style={{ marginBottom: '32px' }}>Пройди короткую авторизацию и присоединяйся, будет интересно 😉</h3>
      <form style={{ marginBottom: '8px' }} onSubmit={handleSubmit}>
        <Space>
          <Input style={{ background: error && 'red' }} type="text" name="name" placeholder="Имя" maxLength="20" required />
          {showPassPhrase && (
            <Input type="text" name="passphrase" placeholder="Passphrase" />
          )}
          <Button type="primary" htmlType="submit">Поехали!</Button>
        </Space>
      </form>
      {!showPassPhrase && (
        <Button onClick={() => setShowPassPhrase(!showPassPhrase)}>Зайти как админ</Button>
      )}
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
