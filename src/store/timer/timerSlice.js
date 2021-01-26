import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: 0,
  reducers: {
    setTimer: (state, { payload }) => payload,
  },
});

export const { setTimer } = timerSlice.actions;

export default timerSlice.reducer;
