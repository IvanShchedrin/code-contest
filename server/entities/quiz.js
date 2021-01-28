const questions = require('../questions.json');

class Quiz {
  #io = null
  #step = 'waiting'
  #gameStep = 'question'
  #questionIndex = -1
  #timeout = null
  #timeoutId = null;

  constructor(io) {
    this.#io = io;
    this.#initSocket();
  }

  #initSocket = () => {
    this.#io.on('connection', this.#sendState);
  }

  #sendState = (socket) => {
    const currentQuestion = this.#getQuestion();
    const { key, ...question } = currentQuestion || {};

    (socket || this.#io).emit('set_state', {
      step: this.#step,
      gameStep: this.#gameStep,
      timeout: this.#timeout,
      question: currentQuestion ? question : null,
    });
  }

  #getQuestion() {
    return questions[this.#questionIndex];
  }

  reset = () => {
    clearTimeout(this.#timeoutId);
    this.#step = 'waiting';
    this.#gameStep = 'question';
    this.#questionIndex = -1;
  }

  nextQuestion = () => {
    clearTimeout(this.#timeoutId);

    this.#questionIndex = this.#questionIndex + 1;
    const question = this.#getQuestion();

    if (question) {
      this.#timeoutId = setTimeout(this.finishQuestion, question.timeout * 1000);
      this.#timeout = new Date(new Date().getTime() + question.timeout * 1000);
      this.#step = 'game';
      this.#gameStep = 'question';
    } else {
      this.#timeout = null;
      this.#step = 'finish';
      this.#gameStep = 'question';
      this.#questionIndex = -1;
    }

    this.#sendState();
  }

  finishQuestion = () => {
    clearTimeout(this.#timeoutId);
    this.#io.emit('answer', this.#getQuestion().key);
  }
}

module.exports = Quiz;
