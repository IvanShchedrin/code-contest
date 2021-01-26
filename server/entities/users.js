const User = require('./user');

class Users {
  constructor() {
    this.users = {};
  }

  createUser = ({ name }) => {
    const user = new User({
      name,
      avatarIndex: Object.keys(this.users).length % 18,
    });
    this.users[user.id] = user;
    return user;
  }

  get = (id) => {
    return this.users[id];
  };

  removeUser = (id) => {
    delete this.users[id];
  };
}

module.exports = Users;
