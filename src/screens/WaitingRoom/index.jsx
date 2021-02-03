import { connect } from 'react-redux';

import { selectUsers } from 'store/app/selectors';

// Styles
import styles from './styles.scss';

export const WaitingRoomComponent = ({ users }) => (
  <div className={styles.components}>
          <h1 className={styles.title}>Подключенные пользователи:</h1>
          <div className={styles.container}>
              {users && users.map((user) => (
                  <div key={user.id} className={styles.userWrap}>
                      <img src={user.avatar} alt="icon" className={styles.avatar} />
                      <span className={styles.name}>
                          {user.name}
                      </span>
                  </div>
              ))}
          </div>
  </div>
);

const mapStateToProps = (state) => ({
  users: selectUsers(state),
});

export const WaitingRoom = connect(mapStateToProps)(WaitingRoomComponent);
