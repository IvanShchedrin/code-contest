import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    step: 'login',
    timeout: null,
  },
  reducers: {
    setStep: (state, { payload }) => {
      state.step = payload;
    },
    updateApp: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
  },
});

export const { setStep, updateApp } = appSlice.actions;

export default appSlice.reducer;

