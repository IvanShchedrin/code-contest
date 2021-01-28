import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { connect } from 'react-redux';
import { selectStep } from 'store/app/selectors';
import { updateApp, setKey } from 'store/app/appSlice';

const WithQuizControllerComponent = ({ step, updateApp, setKey, children }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (step === 'login' || connected) return;

    const socket = socketIO();

    socket.on('set_state', updateApp);
    socket.on('answer', setKey);

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
};

export const WithQuizController = connect(mapStateToProps, mapDispatchToProps)(WithQuizControllerComponent);
