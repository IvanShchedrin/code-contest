import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'question',
  initialState: {
    text: '',
    answers: null,
    timer: 30,
  },
  reducers: {
    
  },
});
