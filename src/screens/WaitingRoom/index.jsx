import { connect } from 'react-redux';

import { selectUsers } from 'store/app/selectors'

export const WaitingRoomComponent = ({ users }) => (
  <>
    Подключенные пользователи:
    <div>
      {users && users.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} alt="" />
          {user.name}
        </div>
      ))}
    </div>
  </>
);

const mapStateToProps = (state) => ({
  users: selectUsers(state),
});

export const WaitingRoom = connect(mapStateToProps)(WaitingRoomComponent);
