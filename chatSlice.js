import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAIResponse } from "./chatAPI";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const res = await fetchAIResponse(message);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
