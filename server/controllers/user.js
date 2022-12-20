const yearMs = 31104000000;

module.exports = (app, users) => {
  app.post('/api/signin', (req, res) => {
    if (!req.userData) {
      res.cookie('user_token', null, { maxAge: -1, httpOnly: true });
      res.sendStatus(401);
      return res.end();
    }

    const { passPhrase, ...user } = req.userData;

    res.cookie('user_token', req.userData.id, { maxAge: yearMs, httpOnly: true });
    res.end(JSON.stringify(user));
  });

  app.post('/api/signup', async (req, res) => {
    const { name, passPhrase } = req.body;
    const user = await users.createUser({ name, passPhrase });

    if (!user) {
      res.sendStatus(400);
      return res.end();
    }

    const { passPhrase: _, ...userWithoutPassPhrase } = user;

    res.cookie('user_token', user.id, { maxAge: yearMs, httpOnly: true });
    res.end(JSON.stringify(userWithoutPassPhrase));
  });

  return users;
}
