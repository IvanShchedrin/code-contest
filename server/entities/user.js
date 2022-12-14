const userModel = require('../db/models/user');
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

  constructor({ id, name, avatar, passPhrase, admin }) {
    this.id = id || uuid();
    this.name = name;
    this.avatar = avatar || `/static/icons/bot-${Math.floor(Math.random() * 19)}.png`;
    this.passPhrase = passPhrase || '';
    this.admin = admin || passPhrase === adminKey;
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

  createDbInstance = async () => {
    const user = new userModel({
      id: this.id,
      name: this.name,
      passPhrase: this.passPhrase,
      avatar: this.avatar,
      admin: this.admin,
    });

    await user.save();
  }
}

module.exports = User;
