const questions = require('../questions.json');
const ACTIONS = require('../socketActions');

let step = 'waiting';

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('connected');
    socket.emit(ACTIONS.connected, {
      step,
    });
  });
}
