const UserModel = require('../db/models/user');

const logUsers = async () => {
  const usersDb = await UserModel.find();
  const users = {};
  usersDb.forEach((user) => {
    users[user.id] = {
      name: user.name,
      quizScore: user.score,
    }
  });
  console.log(users);
  process.exit();
};

require('../db')(logUsers);

