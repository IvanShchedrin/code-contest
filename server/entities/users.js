const User = require('./user');

class Users {
  constructor() {
    this.users = {};
  }

  createUser = ({ name, passPhrase }) => {
    const user = new User({
      name,
      passPhrase,
      avatarIndex: Object.keys(this.users).length % 18,
    });
    this.users[user.id] = user;
    return user;
  }

  get = (id) => {
    return this.users[id];
  }

  getScore = () => (
    Object.keys(this.users)
      .map((id) => ({
        id,
        name: this.users[id].name,
        score: this.users[id].score,
        avatar: this.users[id].avatar,
      }))
      .filter((user) => user.score > 0)
  )

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
