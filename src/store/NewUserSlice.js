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

export const verifyUser = createAsyncThunk(
  'GET api/users/verifyUsername',
  async () => {
    try {
      const { data } = await axios.get('api/users/verifyUsername');

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'GET api/users/verifyEmail',
  async () => {
    try {
      const { data } = await axios.get('api/users/verifyEmail');

      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const NewUserSlice = createSlice({
  name: 'NewUser',
  initialState: {
    newUserInfo: [],
    usernameList: [],
    emailList: [],
    status: false,
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
      .addCase(verifyUser.fulfilled, (state, { payload }) => {
        state.usernameList = payload;
      })
      .addCase(verifyEmail.fulfilled, (state, { payload }) => {
        state.emailList = payload;
      });
  },
});

export const { changeStatus } = NewUserSlice.actions;
export default NewUserSlice.reducer;
