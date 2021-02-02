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
  const handleFinishQuestion = () => {
    axios.post('/api/admin/finish-question');
  };
  const handleRestart = () => {
    axios.post('/api/admin/reset');
  };
  const handleQuestionsSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/admin/upload-questions', { payload: event.currentTarget.questions.value })
      .then(() => alert('Success'))
      .catch(() => alert('Error'));
  };

  return (
    <div style={{ marginTop: '32px' }}>
      {step === 'waiting' && (
        <form onSubmit={handleQuestionsSubmit}>
          <input type="text" name="questions" autoComplete="off" />
          <button type="submit">Upload questions</button>
        </form>
      )}
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
      {step === 'game' && gameStep === 'question' && (
        <button type="button" onClick={handleFinishQuestion}>
          Finish question
        </button>
      )}
      <button type="button" onClick={handleRestart}>
        Reset
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  step: selectStep(state),
  gameStep: selectGameStep(state),
});

export const AdminControls = connect(mapStateToProps)(AdminControlsComponent);
