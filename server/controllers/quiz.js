module.exports = (app, quiz) => {
  app.post('/api/apply-answer', (req, res) => {
    const { key } = req.body;
    const gameStep = quiz.getGameStep();

    if (req.userData && gameStep === 'question') {
      req.userData.setSelectedAnswer(key);
    } else {
      res.sendStatus(401);
    }
    res.end();
  });

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

  app.post('/api/admin/finish-question', (req, res) => {
    quiz.finishQuestion();
    res.end();
  });

  app.post('/api/admin/reset', (req, res) => {
    quiz.reset();
    res.end();
  });
}
