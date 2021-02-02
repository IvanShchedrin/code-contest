import { useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import confetti from 'canvas-confetti';

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
    <>
      timeout: {timeout}
      {question && (
        <>
          <p dangerouslySetInnerHTML={{ __html: question.text }} />
          {question.options.map((text, index) => (
            <button
              style={{ background: index === userAnswer ? '#93caff' : '#e5e5e5' }}
              onClick={() => handleAnswerSelect(index)}
              key={text}
            >
              {index === answerKey ? '✅ ' : ' '}
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </button>
          ))}
        </>
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
