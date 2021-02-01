class Questions {
  #questions = null

  load = (payload) => {
    try {
      this.#questions = JSON.parse(payload);
      return true;
    } catch(error) {
      return false;
    }
  }

  isLoaded = () => {
    return Boolean(this.#questions);
  }

  get = (index) => {
    return this.#questions && this.#questions[index];
  }
}

module.exports = Questions;
