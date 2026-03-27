import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAIResponse } from "./chatAPI";
import { v4 as uuidv4 } from "uuid";

const createMessage = (role, content) => ({
  id: uuidv4(), 
  role,
  content,
  timestamp: Date.now(),
});

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { getState, rejectWithValue }) => {
    try {
      const state = getState();

      const apiMessages = state.chat.messages.map(({ role, content }) => ({
        role,
        content,
      }));

      apiMessages.push({ role: "user", content: message });

      const res = await fetchAIResponse(apiMessages);

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

  state.messages.push(createMessage("user", action.meta.arg));
})

.addCase(sendMessage.fulfilled, (state, action) => {
  state.loading = false;

  state.messages.push(createMessage("assistant", action.payload));
})

.addCase(sendMessage.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;

  const lastMessage = state.messages[state.messages.length - 1];

  if (lastMessage?.role === "user") {
    lastMessage.failed = true;
  }
});
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
