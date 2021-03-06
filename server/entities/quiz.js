const cookieParse = require('cookie').parse;

class Quiz {
  #io = null
  #step = 'waiting'
  #gameStep = 'question'
  #questionIndex = -1
  #key = null
  #timeout = null
  #timeoutId = null
  #users = null
  #questions = null

  constructor(io, users, questions) {
    this.#users = users;
    this.#questions = questions;
    this.#io = io;
    io.on('connection', this.#onConnection);
  }

  #onConnection = (socket) => {
    const { user_token } = cookieParse(socket.request.headers.cookie || '');
    const user = this.#users.get(user_token);

    if (!user) {
      socket.disconnect(true);
      return;
    }

    socket.on('disconnect', () => {
      user.setConnected(false);
    });

    this.#sendState({
      results: this.#step === 'results' ? this.#users.getScore() : null,
    }, socket);

    if (this.#step === 'waiting') {
      this.#sendUsers();
    }
  }

  #sendState = (payload = {}, socket) => {
    const currentQuestion = this.#getQuestion();
    const { key, ...question } = currentQuestion || {};

    (socket || this.#io).emit('set_state', {
      step: this.#step,
      gameStep: this.#gameStep,
      timeout: this.#timeout,
      question: currentQuestion ? question : null,
      key: this.#key,
      ...payload,
    });
  }

  #sendUsers = () => {
    this.#io.emit('set_state', {
      users: this.#users.getUsers(),
    });
  }

  #getQuestion() {
    return this.#questions.get(this.#questionIndex);
  }

  reset = () => {
    clearTimeout(this.#timeoutId);
    this.#step = 'waiting';
    this.#gameStep = 'question';
    this.#questionIndex = -1;
    this.#key = null;
    this.#users.resetScore();
    this.#sendState({
      results: null,
      userAnswer: null,
    });
  }

  nextQuestion = () => {
    clearTimeout(this.#timeoutId);

    this.#questionIndex = this.#questionIndex + 1;
    this.#key = null;

    const question = this.#getQuestion();

    if (!question) {
      this.finishGame();
      return;
    }

    this.#timeoutId = setTimeout(this.finishQuestion, question.timeout * 1000);
    this.#timeout = new Date(new Date().getTime() + question.timeout * 1000);
    this.#step = 'game';
    this.#gameStep = 'question';

    this.#sendState({
      userAnswer: null,
    });
  }

  finishQuestion = () => {
    const key = this.#getQuestion().key;

    clearTimeout(this.#timeoutId);

    this.#key = key;
    this.#gameStep = 'answer';
    this.#users.applyAnswers(key);
    this.#io.emit('answer', key);
  }

  finishGame = () => {
    this.#timeout = null;
    this.#step = 'results';
    this.#gameStep = 'question';
    this.#questionIndex = -1;
    this.#io.emit('results', this.#users.getScore());
  }

  getGameStep = () => {
    return this.#gameStep;
  }
}

module.exports = Quiz;
