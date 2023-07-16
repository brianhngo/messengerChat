import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import MessageSlice from './MessageSlice';
import NewUserSlice from './NewUserSlice';
const store = configureStore({
  reducer: {
    login: LoginPage,
    messages: MessageSlice,
    newuser: NewUserSlice,
  },
});

export default store;
