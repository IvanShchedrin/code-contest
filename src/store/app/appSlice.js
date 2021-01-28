import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    step: 'login',
    gameStep: null,
    timeout: null,
    question: null,
    key: null,
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
    setKey: (state, { payload }) => {
      state.key = payload;
      state.gameStep = 'answer';
    },
  },
});

export const { setStep, updateApp, setKey } = appSlice.actions;

export default appSlice.reducer;

