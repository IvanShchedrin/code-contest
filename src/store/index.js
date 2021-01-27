import { configureStore, combineReducers } from '@reduxjs/toolkit';

import app from './app/appSlice';
import user from './user/userSlice';

export const store = configureStore({
  reducer: combineReducers({ app, user }),
})
