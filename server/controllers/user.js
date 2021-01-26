const Users = new require('../entities/users');
const users = new Users();

module.exports = (app) => {
  app.post('/api/signin', (req, res) => {
    const { user_token } = req.cookies;
    let user = user_token ? users.get(user_token) : null;

    if (!user) {
      const { name } = req.body;
      user = users.createUser({ name });
    }

    res.cookie('user_token', user.id, { maxAge: 31104000000, httpOnly: true });
    res.end(JSON.stringify(user));
  });
}
