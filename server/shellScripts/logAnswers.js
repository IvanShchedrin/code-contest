const AnswerModel = require('../db/models/answer');

const QUESTION_ALIAS = {
  '10': 'Tree',
  '11': 'Planets',
  '12': 'Button',
  '13': 'Creativity',
}

const logAnswers = async () => {
  const answersDb = await AnswerModel.find();
  const answersByUser = {};
  answersDb.forEach((answer) => {
    answersByUser[answer.userId] = answersByUser[answer.userId] || {};
    answersByUser[answer.userId][QUESTION_ALIAS[answer.questionId] || answer.questionId] = answer.key;
  });
  console.log(answersByUser);
  process.exit();
};

require('../db')(logAnswers);
