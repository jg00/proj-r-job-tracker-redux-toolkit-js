import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isSidebarOpen: false, // Ref Navbar.js.  Display/hide left side bar (ie BigSidebar component).
  user: getUserFromLocalStorage(), // First place for app to check for user. At Register component we could have a useEffect to check for user and programmatically navigate to dashboard.
};

// Async action creators (middleware). Dispatched from components and the promise returned will automatically dispatch the lifecycle actions set up in extraReducers below.
export const registerUser = createAsyncThunk(
  "user/registerUser", // action type prefix
  async (user, thunkAPI) => registerUserThunk("/auth/register", user, thunkAPI) // returns async function so really no need to add 'async' to this function.
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => loginUserThunk("/auth/login", user, thunkAPI)
);

// Update user profile
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => updateUserThunk("auth/updateUser", user, thunkAPI)
);

// Ref Navbar. Ref axios.js, allJobsThunk for UnAuthorized Requests.
export const clearStore = createAsyncThunk("user/clearStore", clearStoreThunk);

// Imported in store.js
const userSlice = createSlice({
  name: "user",
  initialState,
  // Note that arguments passed into reducer functions when invoked is treated as the action.payload for example logout('')
  reducers: {
    // action type user/toggleSidebar
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    // action type user/logoutUser
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      // Only if we pass in a payload ex ref Navbar.js
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    // action type user/registerUser/pending
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const user = payload.user;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`Hello There ${user.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // action type user/loginUser/pending
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user; // IMPORTANT: This is the source for this app used to protect routes, to get initial data for user Profile.
      addUserToLocalStorage(user);
      toast.success(`Welcome Back ${user.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // action type user/updateUser/pending
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      const { user } = payload;
      state.isLoading = false;
      state.user = user;
      addUserToLocalStorage(user);
      toast.success(`User Updated ${user.name}`);
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // action type user/clearStore/rejected
    [clearStore.rejected]: () => {
      toast.error("There was an error");
    },
  },
});

// Automatically get action creators when we set up reducers. These are dispatched within components.
export const { toggleSidebar, logoutUser } = userSlice.actions;

// Combined with other reducers in store.js
export default userSlice.reducer;

/*
  Idea:
  - Set up slice of state and provide initial state
  - Provide reducers. Will need to be exported.
  - Automatically get action creators. Will need to be exported.
  - Any async action creator functions via createAsyncThunk() will need to be exported
  and the promise returned should be handled accordingly.
*/
