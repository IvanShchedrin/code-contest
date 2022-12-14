const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV === 'development';

app.use(bodyParser());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'server', 'static')));

require('./server/db')();
require('./server/controllers')(app, io);

if (dev) {
  require('./server/devServer')(app);
}

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

http.listen(port, () => {
  console.log(`
  ⚡️⚡️⚡️
  Server started
  - mode: ${dev ? 'development' : 'production'}
  - address: http://localhost:${port}
  ⚡️⚡️⚡️
  `);
});
