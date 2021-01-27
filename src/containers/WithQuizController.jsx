import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';
import { connect } from 'react-redux';
import { selectStep } from 'store/app/selectors';
import { updateApp } from 'store/app/appSlice';

const WithQuizControllerComponent = ({ step, updateApp, children }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (step === 'login' || connected) return;

    const socket = socketIO('http://localhost:3000');

    socket.on('set_state', (payload) => {
      console.log('payload', payload);
      updateApp(payload);
    });

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
};

export const WithQuizController = connect(mapStateToProps, mapDispatchToProps)(WithQuizControllerComponent);
