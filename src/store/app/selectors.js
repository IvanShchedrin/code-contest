import { createSelector } from '@reduxjs/toolkit';

export const selectApp = createSelector(
  state => state,
  (state) => state.app,
);

export const selectStep = createSelector(
  selectApp,
  (app) => app.step,
);

export const selectGameStep = createSelector(
  selectApp,
  (app) => app.gameStep,
);

export const selectQuestion = createSelector(
  selectApp,
  (app) => app.question,
);

export const selectTimeout = createSelector(
  selectApp,
  (app) => app.timeout,
);

export const selectUserAnswer = createSelector(
  selectApp,
  (app) => app.userAnswer,
);

export const selectKey = createSelector(
  selectApp,
  (app) => app.key,
);

export const selectResults = createSelector(
  selectApp,
  (app) => app.results,
);

export const selectUsers = createSelector(
  selectApp,
  (app) => app.users,
);
