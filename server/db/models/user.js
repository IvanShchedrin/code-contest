const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  passPhrase: {
    type: String,
  },
  avatar: {
    type: String,
  },
  admin: {
    type: Boolean,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
