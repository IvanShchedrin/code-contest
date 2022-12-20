import { useEffect } from 'react';
import classnames from 'classnames/bind';
import axios from 'axios';
import { connect } from 'react-redux';
import confetti from 'canvas-confetti';

import { Timer } from 'components/Timer';

import { setUserAnswer } from 'store/app/appSlice';
import { selectGameStep, selectQuestion, selectUserAnswer, selectKey, selectTimeout } from 'store/app/selectors';
import styles from './styles.scss';
const cx = classnames.bind(styles);

export const GameComponent = ({ gameStep, question, timeout, userAnswer, answerKey, setUserAnswer }) => {
  const handleAnswerSelect = (index) => {
    if (gameStep !== 'question') return;

    axios.post('/api/apply-answer', { key: index })
      .then(() => {
        setUserAnswer(index);
      });
  };

  const handleCodeSubmit = (event) => {
    event.preventDefault();

    const text = event.target.textAnswer.value;

    if (!text) {
      return;
    }

    axios.post('/api/apply-answer', { text })
      .then(() => {
        setUserAnswer(true);
        event.target.textAnswer.value = '';
      })
      .catch(() => {
        alert('Упс, что-то пошло не так и ответ не сохранился. Попробуй еще раз')
      });
  };

  useEffect(() => {
    if (typeof userAnswer === 'number' && typeof answerKey === 'number' && userAnswer === answerKey) {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.8, x: 0 }, angle: 70 });
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.8, x: 1 }, angle: 110 });
    }
  }, [userAnswer, answerKey]);

  return (
    <>
      {gameStep === 'question' && timeout && (
        <Timer timeout={timeout} />
      )}

      {question && (
        <div className={styles.components}>
          {question.title && (
            <h2 dangerouslySetInnerHTML={{ __html: question.title }} className={styles.title} />
          )}
          {question.text && (
            <div dangerouslySetInnerHTML={{ __html: question.text }} className={styles.questionText} />
          )}
          <div className={styles.wrap}>
            {question.type === 'quiz' && (
              question.options.map((text, index) => (
                <button
                  onClick={() => handleAnswerSelect(index)}
                  key={text}
                  className={cx('button', {
                    selected: gameStep === 'question' && index === userAnswer,
                    right: gameStep === 'answer' && index === answerKey,
                    wrong: gameStep === 'answer' && index === userAnswer && userAnswer !== answerKey,
                  })}
                >
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </button>
              ))
            )}
            {question.type === 'contest' && (
              <form onSubmit={handleCodeSubmit} className={styles.form}>
                {gameStep !== 'answer' && (
                  <>
                    <label className={styles.textareaLabel}>
                      Вставь сюда готовый ответ и нажми "Отправить"
                    </label>
                    <textarea name="textAnswer" id="textAnswer" className={styles.textarea} />
                    <button
                      type="submit"
                      className={styles.submitButton}
                      disabled={gameStep === 'answer'}
                    >
                      Отправить
                    </button>
                  </>
                )}
                {userAnswer && (
                  <div className={styles.submitStatus}>Ответ принят</div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  gameStep: selectGameStep(state),
  question: selectQuestion(state),
  userAnswer: selectUserAnswer(state),
  answerKey: selectKey(state),
  timeout: selectTimeout(state),
});

const mapDispatchToProps = {
  setUserAnswer,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
