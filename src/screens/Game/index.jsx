import { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import confetti from 'canvas-confetti';

import { Timer } from 'components/Timer';

import { setUserAnswer } from 'store/app/appSlice';
import { selectGameStep, selectQuestion, selectUserAnswer, selectKey, selectTimeout } from 'store/app/selectors';

// Styles
import styles from './styles.scss';

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
                    style={{ background: index === userAnswer ? '#27EE53' : 'rgba(255, 255, 255, 0.2)' }}
                    onClick={() => handleAnswerSelect(index)}
                    key={text}
                    className={styles.button}
                >
                  {index === answerKey ? '✅ ' : ' '}
                  <span dangerouslySetInnerHTML={{ __html: text }} />
                </button>
            ))}
          </div>
          <div className={styles.image} />
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
