const User = require('./user');
const userModel = require('../db/models/user');

class Users {
  constructor() {
    this.users = {};
  }

  createUser = async ({ name, passPhrase }) => {
    const existedUserId = Object.keys(this.users).find((id) => this.users[id].name === name);
    let user = existedUserId ? this.users[existedUserId] : null;

    if (user) {
      return user.connected ? false : user;
    }

    try {
      const userDb = await userModel.findOne({ name });
      if (userDb) {
        if (userDb.passPhrase === passPhrase) {
          user = new User(userDb);
        } else {
          return false;
        }
      } else {
        user = new User({ name, passPhrase });
        await user.createDbInstance();
      }
    } catch (err) {
      return false;
    }

    this.users[user.id] = user;
    return user;
  }

  get = (id) => {
    return this.users[id];
  }

  retrieveUser = async (id) => {
    if (this.users[id]) {
      return this.users[id];
    }

    try {
      const userDb = await userModel.findOne({ id });
      if (!userDb) return false;

      const user = new User(userDb);
      this.users[user.id] = user;
      return user;
    } catch (err) {
      console.log(err);
    }

    return false;
  }

  getUsers = () => {
    return Object.keys(this.users)
      .map((id) => ({
        id,
        name: this.users[id].name,
        avatar: this.users[id].avatar,
      }));
  }

  getScore = () => {
    return Object.keys(this.users)
      .map((id) => ({
        id,
        name: this.users[id].name,
        score: this.users[id].score,
        avatar: this.users[id].avatar,
      }))
      .filter((user) => user.score > 0);
  }

  applyAnswers = (key) => {
    for (const id in this.users) {
      const user = this.users[id];

      if (user.selectedAnswer === key) {
        user.score = user.score + 1;
      }

      user.selectedAnswer = null;
    }
  }

  resetScore = () => {
    Object.keys(this.users)
      .forEach((id) => {
        this.users[id].setScore(0);
      })
  }

  removeUser = (id) => {
    delete this.users[id];
  }
}

module.exports = Users;
