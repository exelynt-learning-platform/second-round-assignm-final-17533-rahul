import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAIResponse } from "./chatAPI";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const messages = [
        ...state.chat.messages,
        { role: "user", content: message },
      ];

      const res = await fetchAIResponse(messages);

      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearChat: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(sendMessage.pending, (state, action) => {
  state.loading = true;
  state.error = null;


  state.messages.push({
    id: Date.now(),
    role: "user",
    content: action.meta.arg,
  });
})

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          role: "assistant",
          content: action.payload.aiMessage,
        });
      })

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
