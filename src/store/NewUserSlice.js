import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createNewUser = createAsyncThunk(
  'POST api/users/',
  async (obj) => {
    try {
      const { data } = await axios.post('api/users/', obj);

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const verifyEmailStatus = createAsyncThunk(
  'PUT api/users/verifyEmail',
  async (email) => {
    try {
      const { data } = await axios.put('api/users/verifyEmailStatus', {
        email,
      });
      return data.exists;
    } catch (error) {
      console.error(error);
    }
  }
);

export const verifyUsernameStatus = createAsyncThunk(
  'PUT api/users/verifyUsername',
  async (username) => {
    try {
      const { data } = await axios.put('api/users/verifyUsernameStatus', {
        username,
      });
      return data.exists;
    } catch (error) {
      console.error(error);
    }
  }
);

const NewUserSlice = createSlice({
  name: 'NewUser',
  initialState: {
    status: false,
    emailStatusTesting: null,
    usernameStatusTesting: null,
  },
  reducers: {
    changeStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.status = true;
        }
      })
      .addCase(verifyEmailStatus.fulfilled, (state, { payload }) => {
        state.emailStatusTesting = payload;
      })
      .addCase(verifyUsernameStatus.fulfilled, (state, { payload }) => {
        state.usernameStatusTesting = payload;
      });
  },
});

export const { changeStatus } = NewUserSlice.actions;
export default NewUserSlice.reducer;
