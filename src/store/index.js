import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from './user/userSlice';
import timer from './timer/timerSlice';

const store = configureStore({
  reducer: combineReducers({ user, timer }),
})

window.store1 = store;
