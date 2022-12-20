const AnswerModel = require('../db/models/answer');

module.exports = (app, quiz, questions) => {
  app.post('/api/apply-answer', async (req, res) => {
    const { key, text } = req.body;
    const gameStep = quiz.getGameStep();
    const question = quiz.getQuestion();

    if (!req.userData || gameStep !== 'question') {
      res.sendStatus(401);
      res.end();
      return;
    }

    if (question.type !== 'contest') {
      req.userData.setSelectedAnswer(key);
      res.end();
      return;
    }

    try {
      const currentAnswer = await AnswerModel.findOne({
        userId: req.userData.id,
        questionId: question.id,
      });

      if (currentAnswer) {
        currentAnswer.key = text;
        await currentAnswer.save();
      } else {
        const answer = new AnswerModel({
          userId: req.userData.id,
          questionId: question.id,
          key: text,
        });
        await answer.save();
      }
    } catch (err) {
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
