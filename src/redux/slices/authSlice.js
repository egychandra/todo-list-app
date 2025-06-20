import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || '',
  isAuthenticated: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.username = username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    },
    logout: (state) => {
      state.token = '';
      state.isAuthenticated = false;
      state.username = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    registerSuccess: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.username = username;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
    }
  }
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export default authSlice.reducer;