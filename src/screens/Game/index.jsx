import { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import confetti from 'canvas-confetti';
import styles from './styles.scss';

import { Timer } from 'components/Timer';

import { setUserAnswer } from 'store/app/appSlice';
import { selectGameStep, selectQuestion, selectUserAnswer, selectKey, selectTimeout } from 'store/app/selectors';

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
    <div className={styles.component}>
      {gameStep === 'question' && timeout && (
        <Timer timeout={timeout} />
      )}
      <br />
      <br />
      {question && (
        <>
          <div
            className={styles.question}
            dangerouslySetInnerHTML={{ __html: question.text }}
          />
          {question.options.map((text, index) => (
            <button
              className={styles.answer}
              style={{
                borderColor: index === userAnswer ? '#27ee53' : '#a8a8a8',
                pointerEvents: gameStep === 'answer' ? 'none' : 'all',
              }}
              onClick={() => handleAnswerSelect(index)}
              key={text}
            >
              {index === answerKey ? '✅ ' : ' '}
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </button>
          ))}
        </>
      )}
    </div>
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
