const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const dev = process.env.NODE_ENV === 'development';

if (dev) {
  require('./utils/devServer')(app);
}

app.use('/dist', express.static(__dirname + '/dist'))

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
})

app.listen(port, () => {
  console.log(`⚡️⚡️⚡️\nServer started\n- mode: ${dev ? 'development' : 'production'}\n- address: http://localhost:${port}\n⚡️⚡️⚡️`);
});
