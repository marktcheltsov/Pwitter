import { fetchCurrentUser } from "@/serveces/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserThunk = createAsyncThunk('user/fetch', async (_, thunkAPI) => {
    try {
      const response = await fetchCurrentUser();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
});
