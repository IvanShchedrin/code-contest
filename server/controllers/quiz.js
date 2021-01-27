module.exports = (app, quiz) => {
  app.post('/start', (req, res) => {
    quiz.start();
    res.end(JSON.stringify({ status: 'ok' }));
  });
}
