import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  rol: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  rol: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.rol = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.rol = null;
    },
  },
});

export const { login, logout } = userReducer.actions;

export default userReducer.reducer;
