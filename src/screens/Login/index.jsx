import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import classnames from 'classnames/bind';

import { initUser } from 'store/user/userSlice';
import { updateApp } from 'store/app/appSlice';
import { selectUser } from 'store/user/selectors';

import styles from './styles.scss';
const cx = classnames.bind(styles);

const LoginComponent = ({ initUser, updateApp }) => {
  const [loading, setLoading] = useState(true);

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
      .then(handleAuth);
  };

  return loading ? (
    <>
      Loading...
    </>
  ) : (
    <div className={cx('component', 'page-pad')}>
      <p className={styles.text}>
        Привет и добро пожаловать на frontend quiz!
        <br />
        <br />
        Пройди короткую авторизацию и присоединяйся, будет интересно 😉
        <br />
        <br />
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="passphrase" placeholder="admin pass phrase" />
        <button type="submit">Поехали!</button>
      </form>
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