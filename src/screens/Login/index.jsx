import { useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames/bind'

import styles from './styles.scss';
const cx = classnames.bind(styles);

export const Login = () => {
  useEffect(() => {
    axios.post('/api/signin', {
      name: 'vatrushka',
    });
  }, []);

  return (
    <div className={cx('component', 'page-pad')}>
      <p className={styles.text}>
        Привет и добро пожаловать на frontend quiz!
        <br />
        <br />
        Пройди коротку авторизацию и присоединяйся, будет интересно 😉
      </p>
    </div>
  );
}
