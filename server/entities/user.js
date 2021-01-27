const uuid = require('uuid/v1');

const adminKey = 'f47bc0b4-8191-4ff2-a1c2-c29a5f83a219';

class User {
  constructor({ name, avatarIndex, passPhrase }) {
    this.id = uuid();
    this.name = name;
    this.avatar = `/static/icons/bot-${avatarIndex}.png`;
    this.admin = passPhrase === adminKey;
  }
}

module.exports = User;
