import { createSelector } from '@reduxjs/toolkit';

export const selectApp = createSelector(
  state => state,
  (state) => state.app,
);

export const selectStep = createSelector(
  selectApp,
  (app) => app.step,
);
