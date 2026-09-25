import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import api from "../api/authApi";
import type {
  LoginRequestData,
  RegisterRequestData,
} from "../components/authorization/auth-types";

type AuthStore = {
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
};

type AuthResponse = {
  data: {
    access_token: string;
  };
};

const storedToken = localStorage.getItem("token");

const initialState: AuthStore = {
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  error: null,
};

export const signIn = createAsyncThunk<
  string,
  LoginRequestData,
  { rejectValue: string }
>("auth/signIn", async (userData, thunkAPI) => {
  try {
    const response: AuthResponse = await api.post("api/auth/login", userData);
    return response.data.access_token;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка входа в аккаунт");
  }
});

export const signUp = createAsyncThunk<
  string,
  RegisterRequestData,
  { rejectValue: string }
>("auth/signUp", async (userData, thunkAPI) => {
  try {
    const response: AuthResponse = await api.post(
      "api/auth/register",
      userData,
    );
    return response.data.access_token;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка регистрации");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(signIn.fulfilled, signUp.fulfilled),
        (state, action) => {
          state.token = action.payload;
          state.isAuthenticated = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(signIn.rejected, signUp.rejected),
        (state, action) => {
          state.error = action.payload ?? "Неизвестная ошибка";
        },
      );
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
