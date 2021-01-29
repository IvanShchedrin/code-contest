import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { connect } from 'react-redux';
import { selectStep } from 'store/app/selectors';
import { updateApp, setKey, setResults } from 'store/app/appSlice';

const WithQuizControllerComponent = ({ step, updateApp, setKey, setResults, children }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (step === 'login' || connected) return;

    const socket = socketIO();

    socket.on('set_state', updateApp);
    socket.on('answer', setKey);
    socket.on('results', setResults);

    setConnected(true);
  }, [step, connected]);

  return (
    <>
      {children}
    </>
  );
}

const mapStateToProps = (state) => ({
  step: selectStep(state),
});

const mapDispatchToProps = {
  updateApp,
  setKey,
  setResults,
};

export const WithQuizController = connect(mapStateToProps, mapDispatchToProps)(WithQuizControllerComponent);
