import { createSelector } from '@reduxjs/toolkit';

export const selectUser = createSelector(
  state => state,
  (state) => state.user,
);

export const selectAdmin = createSelector(
  selectUser,
  (user) => user && user.admin,
);
