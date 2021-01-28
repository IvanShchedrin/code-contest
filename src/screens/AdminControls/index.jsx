import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { selectStep, selectGameStep } from 'store/app/selectors';

export const AdminControlsComponent = ({ step, gameStep }) => {
  const handleStart = () => {
    axios.post('/api/admin/start');
  };
  const handleNextQuestion = () => {
    axios.post('/api/admin/next-question');
  };

  return (
    <>
      <p>Game step: {step}</p>
      <p>Question step: {gameStep}</p>

      {step === 'waiting' && (
        <button type="button" onClick={handleStart}>
          Start
        </button>
      )}
      {step === 'game' && (
        <button type="button" onClick={handleNextQuestion}>
          Next question
        </button>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  step: selectStep(state),
  gameStep: selectGameStep(state),
});

export const AdminControls = connect(mapStateToProps)(AdminControlsComponent);
