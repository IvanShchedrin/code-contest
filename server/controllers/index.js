const userController = require('./user');
const quizController = require('./quiz');
const Quiz = require('../entities/quiz');
const Users = require('../entities/users.js');

module.exports = (app, io) => {
  const quiz = new Quiz(io);
  const users = new Users();

  app.post('/api/*', (req, res, next) => {
    req.userData = users.get(req.cookies.user_token);
    next();
  })

  userController(app, users);
  quizController(app, quiz);

  app.post('/api/*', (req, res) => {
    res.sendStatus(404);
  });
}
