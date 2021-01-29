import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    step: 'login',
    gameStep: null,
    timeout: null,
    question: null,
    key: null,
    userAnswer: null,
    results: null,
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
    setUserAnswer: (state, { payload }) => {
      state.userAnswer = payload;
    },
    setResults: (state, { payload }) => {
      state.results = payload;
      state.step = 'results';
    },
  },
});

export const { setStep, updateApp, setKey, setUserAnswer, setResults } = appSlice.actions;

export default appSlice.reducer;

