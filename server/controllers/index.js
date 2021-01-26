const user = require('./user');
const quiz = require('./quiz');

module.exports = (app, io) => {
  user(app);
  quiz(io);

  app.post('/api/*', (req, res) => {
    res.sendStatus(404);
  });
}
