import { useEffect } from 'react';
import classnames from 'classnames/bind';
import axios from 'axios';
import { connect } from 'react-redux';
import confetti from 'canvas-confetti';

import { Timer } from 'components/Timer';

import { setUserAnswer } from 'store/app/appSlice';
import { selectGameStep, selectQuestion, selectUserAnswer, selectKey, selectTimeout } from 'store/app/selectors';

// Styles
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

  useEffect(() => {
    if (typeof userAnswer === 'number' && typeof answerKey === 'number' && userAnswer === answerKey) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.8, x: 0 },
        angle: 70
      });
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.8, x: 1 },
        angle: 110
      });
    }
  }, [userAnswer, answerKey]);

  return (
    <>
      {gameStep === 'question' && timeout && (
        <Timer timeout={timeout} />
      )}

      {question && (
        <div className={styles.components}>
          <p dangerouslySetInnerHTML={{ __html: question.text }} className={styles.questionText}/>
          <div className={styles.wrap}>
            {question.options.map((text, index) => (
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
            ))}
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
