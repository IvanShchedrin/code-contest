import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { selectStep, selectGameStep } from 'store/app/selectors';

// Styles
import styles from './styles.scss';

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
    <div className={styles.components}>
      <p className={styles.adminText}>Admin panel below</p>
      <div className={styles.wrap}>
        {step === 'waiting' && (
            <form onSubmit={handleQuestionsSubmit} className={styles.form}>
              <input type="text" name="questions" autoComplete="off" className={styles.input} />
              <button type="submit" className={styles.button}>Upload questions</button>
            </form>
        )}
        {step === 'waiting' && (
            <button type="button" onClick={handleStart} className={styles.button}>
              Start
            </button>
        )}
        {step === 'game' && (
            <button type="button" onClick={handleNextQuestion} className={styles.button}>
              Next question
            </button>
        )}
        {step === 'game' && gameStep === 'question' && (
            <button type="button" onClick={handleFinishQuestion} className={styles.button}>
              Finish question
            </button>
        )}
        <button type="button" onClick={handleRestart} className={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  step: selectStep(state),
  gameStep: selectGameStep(state),
});

export const AdminControls = connect(mapStateToProps)(AdminControlsComponent);
