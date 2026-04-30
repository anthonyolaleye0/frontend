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
  allAdmins: safelyParseJSON(localStorage.getItem('allAdmins')),
  singleAdmin: safelyParseJSON(localStorage.getItem('singleAdmin')),
  totalAdminsCount: safelyParseJSON(localStorage.getItem('totalAdminsCount')),
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    fetchAlladminsStart(state) {
      state.loading = true;
    },

    fetchAlladminsSuccess(state, action) {
      console.log('adminSlice:', action.payload);
      const { user, accessToken, refreshToken } = action.payload;
      console.log('user in adminSlice:', user);
      console.log('accessToken in adminSlice:', accessToken);
      console.log('refreshToken in adminSlice:', refreshToken);
      state.allAdmins = user;
      state.totalAdminsCount = accessToken;
      localStorage.setItem('allAdmins', JSON.stringify(state.allAdmins));
      localStorage.setItem(
        'totalAdminsCount',
        JSON.stringify(state.totalAdminsCount)
      );
    },

    fetchAlladminsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchSingleAdminSuccess(state, action) {
      state.loading = false;
      console.log('adminSlice:', action.payload);
      const { user, accessToken, refreshToken } = action.payload;
      console.log('user in adminSlice:', user);
      console.log('accessToken in adminSlice:', accessToken);
      console.log('refreshToken in adminSlice:', refreshToken);
      state.singleAdmin = user;
      localStorage.setItem('singleAdmin', JSON.stringify(state.singleAdmin));
    },

    clearAdmins(state) {
      state.loading = false;
      state.allAdmins = null;
      state.totalAdminsCount = null;
      state.singleAdmin = null;
      localStorage.removeItem('allAdmins');
      localStorage.removeItem('totalAdminsCount');
      localStorage.removeItem('singleAdmin');
      state.error = null;
    },

    updateAdmin(state, action) {
      console.log('adminSlice:', action.payload);
      const { user } = action.payload;
      state.singleAdmin = user;
      localStorage.setItem('singleAdmin', JSON.stringify(state.singleAdmin));
      state.error = null;
    },

    loadingStop(state) {
      state.loading = false;
    },
  },
});

export const {
  updateAdmin,
  clearAdmins,
  fetchAlladminsFailure,
  fetchSingleAdminSuccess,
  fetchAlladminsStart,
  fetchAlladminsSuccess,
  loadingStop,
} = adminSlice.actions;

export default adminSlice.reducer;
