import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Space, Button } from 'antd';

import { initUser } from 'store/user/userSlice';
import { updateApp } from 'store/app/appSlice';
import { selectUser } from 'store/user/selectors';

// Styles
import styles from './styles.scss';

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
    <div className={styles.login}>
      <h1 className={styles.login__title}>Frontend quiz!</h1>
      <h3 className={styles.login__subtitle}>Пройди короткую авторизацию и присоединяйся.<br />Будет интересно 😉</h3>
      <div className={styles.login__wrap}>
        <form style={{ marginBottom: '8px' }} className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.container}>
            <label for="name" className={styles.login__label}>
              Name
            </label>
            <input style={{ background: error && 'red' }}
                   className={styles.login__input}
                   type="text"
                   name="name"
                   maxLength="20"
                   required id="name"
            />
            {showPassPhrase && (
                <>
                  <label for="passphrase" className={styles.login__label}>
                    Passphrase
                  </label>
                  <input
                      className={styles.login__input}
                      type="text"
                      name="passphrase"
                      id="passphrase"
                  />
                </>
            )}
            <Button className={styles.login__button} htmlType="submit">Поехали!</Button>
          </div>
        </form>
      {!showPassPhrase && (
        <Button className={[styles.login__label, styles.login__admin]} onClick={() => setShowPassPhrase(!showPassPhrase)}>Зайти как админ</Button>
      )}
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
