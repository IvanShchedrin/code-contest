module.exports = (app, quiz, questions) => {
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

  app.post('/api/admin/upload-questions', (req, res) => {
    const { payload } = req.body;
    const success = questions.load(payload);

    if (!success) {
      res.sendStatus(401);
    }

    res.end();
  });

  app.post('/api/admin/start', (req, res) => {
    if (questions.isLoaded()) {
      quiz.reset();
      quiz.nextQuestion();
    } else {
      res.sendStatus(401);
      return res.end();
    }
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
