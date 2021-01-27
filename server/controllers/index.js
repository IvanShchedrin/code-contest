const userController = require('./user');
const quizController = require('./quiz');
const Quiz = require('../entities/quiz');

module.exports = (app, io) => {
  const quiz = new Quiz(io);
  console.log('createQuiz', quiz);

  userController(app);
  quizController(app, quiz);

  app.post('/api/*', (req, res) => {
    res.sendStatus(404);
  });
}
