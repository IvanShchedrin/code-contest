const uuid = require('uuid/v1');

class User {
  constructor({ name, avatarIndex }) {
    this.id = uuid();
    this.name = name;
    this.avatar = `/static/icons/bot-${avatarIndex}.png`;
  }
}

module.exports = User;
