const mongoose = require('mongoose');

const initDB = () => {
  mongoose.connect('mongodb://localhost:27017/usersdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', function () {
    console.log('mongodb connected successfully');
  });
};

module.exports = initDB;
