import { createSlice } from '@reduxjs/toolkit';

const safelyParseJSON = (item: string | null) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const initialState = {
  currentUser: safelyParseJSON(localStorage.getItem('currentUser')),
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },

    loginSuccess(state, action) {
      state.loading = false;
      const { user, accessToken, refreshToken } = action.payload;
      console.log('user in userslice:', user);
      console.log('accessToken in userslice:', accessToken);
      console.log('refreshToken in userslice:', refreshToken);
      state.currentUser = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      if (state.accessToken) {
        localStorage.setItem('accessToken', state.accessToken);
      }

      if (state.refreshToken) {
        localStorage.setItem('refreshToken', state.refreshToken);
      }
    },

    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearUser(state) {
      console.log('Clearing localStorage to remove current user and tokens');
      state.loading = false;
      state.currentUser = null;
      state.refreshToken = null;
      state.accessToken = null;

      localStorage.removeItem('currentUser');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.error = null;
    },

    updateUser(state, action) {
      const { user } = action.payload;
      state.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = null;
    },

    updateAccessToken(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      if (state.accessToken) {
        localStorage.setItem('accessToken', state.accessToken);
      }

      if (state.refreshToken) {
        localStorage.setItem('refreshToken', state.refreshToken);
      }
    },

    loadingStop(state) {
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUser,
  updateAccessToken,
  clearUser,
  loadingStop,
} = userSlice.actions;

export default userSlice.reducer;
