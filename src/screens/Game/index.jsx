import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { setUserAnswer } from 'store/app/appSlice';
import { selectGameStep, selectQuestion, selectUserAnswer, selectKey } from 'store/app/selectors';

export const GameComponent = ({ gameStep, question, userAnswer, answerKey, setUserAnswer }) => {
  const handleAnswerSelect = (index) => {
    axios.post('/api/apply-answer', { key: index })
      .then(() => {
        setUserAnswer(index);
      });
  };

  return (
    <>
      <p>Game step: {gameStep}</p>
      <p>User answer: {userAnswer}</p>
      <p>Key: {answerKey}</p>
      {typeof answerKey === 'number' && question && (
        <p>
          Answer: {question.options[answerKey]}
        </p>
      )}
      {question && (
        <>
          <p dangerouslySetInnerHTML={{ __html: question.text }} />
          {question.options.map((text, index) => (
            <button
              style={{ background: index === userAnswer ? 'green' : 'gray' }}
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
});

const mapDispatchToProps = {
  setUserAnswer,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);
