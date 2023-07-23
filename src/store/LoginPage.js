import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// sign in // returns a token
export const getLoginInfo = createAsyncThunk(
  '/api/users/testing',
  async (obj) => {
    try {
      const { data } = await axios.post(`/api/users/testing`, obj);
      window.localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const attemptTokenLogin = createAsyncThunk(
  '/api/users/:token',
  async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.get(`/api/users`, {
          headers: {
            authorization: token,
          },
        });
        return data;
      } else {
        window.localStorage.removeItem('token');
      }
    } catch (error) {
      window.localStorage.removeItem('token');
      console.error(error);
    }
  }
);

const LoginPageSlice = createSlice({
  name: 'LoginPage',
  initialState: {
    info: [],
    isLoggedIn: null,
    userInfo: [],
  },
  reducers: {
    changedLoginStatus: (state, { payload }) => {
      window.localStorage.removeItem('token');
      state.isLoggedIn = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginInfo.fulfilled, (state, { payload }) => {
        state.info = payload;
        if (state.info) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
      })
      .addCase(attemptTokenLogin.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
      });
  },
});

export const { changedLoginStatus } = LoginPageSlice.actions;
export default LoginPageSlice.reducer;
