import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    avatar: '',
  },
  reducers: {
    initUser: (state, { payload }) => {
      state.name = payload.name;
      state.avatar = payload.avatar;
    },
  },
});

export const { initUser } = userSlice.actions;

export default userSlice.reducer;
