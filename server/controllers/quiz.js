

module.exports = (app, quiz) => {
  app.post('/api/admin/*', (req, res, next) => {
    if (!req.userData?.admin) {
      res.sendStatus(401);
      return res.end();
    }
    next();
  })

  app.post('/api/admin/start', (req, res) => {
    quiz.reset();
    quiz.nextQuestion();
    res.end();
  });

  app.post('/api/admin/next-question', (req, res) => {
    quiz.nextQuestion();
    res.end();
  });
}
