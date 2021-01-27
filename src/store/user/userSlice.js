import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initUser: (state, { payload }) => {
      if (!state) {
        state = {};
      }
      state.name = payload.name;
      state.avatar = payload.avatar;
      state.admin = payload.admin;
      return state;
    },
  },
});

export const { initUser } = userSlice.actions;

export default userSlice.reducer;
