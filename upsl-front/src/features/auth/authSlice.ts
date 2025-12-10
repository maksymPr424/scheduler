import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "./authThunks";
import { IAuthState } from "@/interfaces/authInterfaces";

const initialState: IAuthState = {
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state, { payload }) => {
      state.token = payload || null;
      state.loading = true;
      state.error = null;
    });
  },
});

export default authSlice.reducer;
