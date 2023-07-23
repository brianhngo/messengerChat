import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const verifyInfoForgetPassword = createAsyncThunk(
  'PUT api/users/verifyForgetPassword',
  async ({ username, firstname, lastname, email }) => {
    try {
      const { data } = await axios.put('api/users/verifyForgetPassword', {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
      });

      // Token2 represents token for forgetPassword
      window.localStorage.setItem('token2', data.forgetPWToken);
      return data.exists;
    } catch (error) {
      console.error(error);
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  'PUT /users/',
  async ({ password }) => {
    try {
      const token2 = window.localStorage.getItem('token2');

      if (token2) {
        const { data } = await axios.put('api/users/ChangePassword', {
          headers: {
            authorization: token2,
            password: password,
          },
        });

        return data;
      } else {
        // window.localStorage.removeItem('token2');
      }
    } catch (error) {
      console.error(error);
      // window.localStorage.removeItem('token2');
    }
  }
);

const ForgetPasswordSlice = createSlice({
  name: 'ForgetPassword',
  initialState: {
    verifyState: null,
    verifyStateStatus: null,
    changeStatus: null,
    changeStatus2: null,
  },
  reducers: {
    changeStatus: (state, { payload }) => {
      state.changeStatus = payload;
    },
    changeStatus2: (state, { payload }) => {
      state.verifyState = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyInfoForgetPassword.fulfilled, (state, { payload }) => {
        state.verifyState = payload;
      })
      .addCase(changeUserPassword.fulfilled, (state, { payload }) => {
        if (payload) {
          state.changeStatus = true;
          window.localStorage.removeItem('token2');
        } else {
          state.changeStatus = false;
        }
      });
  },
});
export const { changeStatus, changeStatus2 } = ForgetPasswordSlice.actions;
export default ForgetPasswordSlice.reducer;
