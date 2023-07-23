import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import MessageSlice from './MessageSlice';
import NewUserSlice from './NewUserSlice';
import ForgetPasswordSlice from './ForgetPasswordSlice';
const store = configureStore({
  reducer: {
    login: LoginPage,
    messages: MessageSlice,
    newuser: NewUserSlice,
    forgetpassword: ForgetPasswordSlice,
  },
});

export default store;
