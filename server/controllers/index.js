const userController = require('./user');
const quizController = require('./quiz');
const Quiz = require('../entities/quiz');
const Users = require('../entities/users.js');

module.exports = (app, io) => {
  const users = new Users();
  const quiz = new Quiz(io, users);

  app.post('/api/*', (req, res, next) => {
    const user = users.get(req.cookies.user_token);

    if (user) {
      user.setConnected(true);
    }

    req.userData = user;
    next();
  })

  userController(app, users);
  quizController(app, quiz);

  app.post('/api/*', (req, res) => {
    res.sendStatus(404);
  });
}
