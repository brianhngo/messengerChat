import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllMessages = createAsyncThunk('/api/messages/', async () => {
  try {
    const { data } = await axios.get('/api/messages');
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const fetchUserMessages = createAsyncThunk(
  'api/messages',
  async (id) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get(`/api/messages/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const addNewMessage = createAsyncThunk(
  'api/messages/add',
  async (obj) => {
    try {
      const { data } = await axios.post(`api/messages/`, {
        message: obj.message,
        status: obj.status,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const MessageSlice = createSlice({
  name: 'Messages',
  initialState: {
    messageList: [],
    messageListUser: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessages.fulfilled, (state, { payload }) => {
        state.messageList = payload;
      })
      .addCase(fetchUserMessages.fulfilled, (state, { payload }) => {
        state.messageListUser = payload;
      })
      .addCase(addNewMessage.fulfilled, (state, { payload }) => {
        return;
      });
  },
});

export default MessageSlice.reducer;
