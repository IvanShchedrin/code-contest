const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  questionId: {
    type: String,
  },
  key: {
    type: String,
  },
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
