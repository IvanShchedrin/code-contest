const questions = require('../questions.json');

class Quiz {
  #io = null;
  #step = 'waiting';
  #question = -1;
  #timeout = 1600000000000;

  constructor(io) {
    this.#io = io;
    this.#initSocket();
  }

  #initSocket = () => {
    this.#io.on('connection', (socket) => {
      socket.emit('set_state', {
        step: this.#step,
        timeout: this.#timeout,
      });
    });
  }

  #sendState = () => {
    this.#io.emit('set_state', {
      step: this.#step,
      timeout: this.#timeout,
    });
  }

  start = () => {
    this.#step = 'game';
    this.#question = 0;
    this.#sendState();
  }
}

module.exports = Quiz;
