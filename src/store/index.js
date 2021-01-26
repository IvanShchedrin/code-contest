import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from './user/userSlice';
import timer from './timer/timerSlice';

export const store = configureStore({
  reducer: combineReducers({ user, timer }),
})
