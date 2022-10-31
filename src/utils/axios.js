import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) {
      config.headers.common["Authorization"] = `Bearer ${user.token}`; // This is a restricted request for a user
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle Unauthorized Error 401 - ex: token expired, invalid, etc.  Ref Dashboard pages.
// Ref allJobsThunk.js, jobThunk.js, userThunk.js
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore()); // Note: Will also logout the user.
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
