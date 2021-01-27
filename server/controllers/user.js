const Users = new require('../entities/users');
const users = new Users();

const yearMs = 31104000000;

module.exports = (app) => {
  app.post('/api/signin', (req, res) => {
    const { user_token } = req.cookies;

    if (!user_token) {
      return res.sendStatus(401);
    }

    const user = users.get(user_token);

    if (!user) {
      res.cookie('user_token', null, { maxAge: -1, httpOnly: true });
      return res.end(null);
    }

    res.cookie('user_token', user.id, { maxAge: yearMs, httpOnly: true });
    res.end(JSON.stringify(user));
  });

  app.post('/api/signup', (req, res) => {
    const { name, passPhrase } = req.body;
    const user = users.createUser({ name, passPhrase });

    if (user.admin) {
      res.cookie('admin_token', passPhrase, { maxAge: yearMs, httpOnly: true });
    }

    res.cookie('user_token', user.id, { maxAge: yearMs, httpOnly: true });
    res.end(JSON.stringify(user));
  });
}
