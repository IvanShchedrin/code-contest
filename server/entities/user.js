const uuid = require('uuid/v1');

const adminKey = 'f47bc0b4-8191-4ff2-a1c2-c29a5f83a219';

class User {
  id = null
  score = 0
  name = null
  avatar = null
  selectedAnswer = null
  admin = false
  connected = true

  constructor({ name, avatarIndex, passPhrase }) {
    this.id = uuid();
    this.name = name;
    this.avatar = `/static/icons/bot-${avatarIndex}.png`;
    this.admin = passPhrase === adminKey;
  }

  setSelectedAnswer = (key) => {
    this.selectedAnswer = key;
  }

  setScore = (value) => {
    this.score = value;
  }

  setConnected = (value) => {
    this.connected = value;
  }
}

module.exports = User;
