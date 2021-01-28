import React from 'react';
import { connect } from 'react-redux';

import { selectGameStep } from 'store/app/selectors';

export const GameComponent = ({ gameStep }) => (
  <>
    Game, step: {gameStep}
  </>
);

const mapStateToProps = (state) => ({
  gameStep: selectGameStep(state),
});

export const Game = connect(mapStateToProps)(GameComponent);
