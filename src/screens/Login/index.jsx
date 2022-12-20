import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Button } from 'antd';

import { initUser } from 'store/user/userSlice';
import { updateApp } from 'store/app/appSlice';
import { selectUser } from 'store/user/selectors';

import styles from './styles.scss';

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
      name: event.currentTarget.quiz_name.value,
      passPhrase: event.currentTarget.quiz_passphrase.value,
    })
      .then(handleAuth)
      .catch(() => {
        setError(true);
      })
  };

  return loading ? null : (
    <div className={styles.login}>
      <h1 className={styles.title}>Frontend ёлка</h1>
      <h3 className={styles.subtitle}>Пройди короткую авторизацию и присоединяйся<br />Будет интересно 😉</h3>
      <div className={styles.wrap}>
        <form style={{ marginBottom: '8px' }} onSubmit={handleSubmit}>
          <div className={styles.container}>
            <div className={styles.inputWrap}>
              <label htmlFor="quiz_name" className={styles.label}>
                Имя и фамилия
              </label>
              <input style={{background: error && 'red'}}
                     className={styles.input}
                     type="text"
                     name="quiz_name"
                     maxLength="100"
                     required id="quiz_name"
              />
            </div>
            <div className={styles.inputWrap}>
              <label htmlFor="quiz_passphrase" className={styles.label}>
                Придумай пароль
              </label>
              <input
                  className={styles.input}
                  type="password"
                  name="quiz_passphrase"
                  id="quiz_passphrase"
              />
            </div>
            <Button className={styles.button} htmlType="submit">Поехали!</Button>
          </div>
        </form>
      </div>
    </div>
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
