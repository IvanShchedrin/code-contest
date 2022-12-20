const cookieParse = require('cookie').parse;
const UserModel = require('../db/models/user');

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
    const currentQuestion = this.getQuestion();
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

  getQuestion() {
    return this.#questions.get(this.#questionIndex);
  }

  getNextQuestion() {
    return this.#questions.get(this.#questionIndex + 1);
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

  nextQuestion = async () => {
    clearTimeout(this.#timeoutId);
    const question = this.getNextQuestion();

    if (!question) return;

    this.#questionIndex = this.#questionIndex + 1;
    this.#key = null;
    this.#timeout = null;
    this.#timeoutId = null;

    if (!question) {
      this.finishGame();
      return;
    }

    if (question.timeout) {
      this.#timeoutId = setTimeout(this.finishQuestion, question.timeout * 1000);
      this.#timeout = new Date(new Date().getTime() + question.timeout * 1000);
    }

    this.#step = 'game';
    this.#gameStep = 'question';

    this.#sendState({
      userAnswer: null,
    });

    if (question.saveProgress) {
      await this.#saveScoreDb();
    }
  }

  finishQuestion = () => {
    const { key, type } = this.getQuestion() || {};

    clearTimeout(this.#timeoutId);

    if (type === 'quiz') {
      this.#key = key;
      this.#users.applyAnswers(key);
    }

    this.#gameStep = 'answer';
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

  #saveScoreDb = async () => {
    const users = this.#users.getScore();

    for (let i = 0; i < users.length; i++) {
      try {
        await UserModel.findOneAndUpdate({ id: users[i].id }, { score: users[i].score || 0 });
        console.log(`User ${users[i].name} with score ${users[i].score} updated`);
      } catch (err) {
        console.log(err);
      }
    }
  }
}

module.exports = Quiz;
