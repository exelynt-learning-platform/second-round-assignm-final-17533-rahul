import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAIResponse } from "./chatAPI";

const createMessage = (role, content) => ({
  id: Date.now() + Math.random(), 
  role,
  content,
  timestamp: Date.now(),
});

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
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

  state.messages.push({
    id: Date.now() + Math.random(),
    role: "assistant",
    content: action.payload, // ✅ FIXED
  });
})

      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
