const uuid = require('uuid/v1');
const adminKey = require('../adminkey');

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
