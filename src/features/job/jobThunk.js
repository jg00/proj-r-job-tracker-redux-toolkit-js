import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

// Action creators from other reducer slices which we can dispatch
// import { logoutUser } from "../user/userSlice"; // Errors now handled in checkForUnauthorizedResponse

// Note by default we get job, thunkAPI b/c this is a callback function when we createAsyncThunk
export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return resp.data; // Only returning to check response
  } catch (error) {
    // Handle authentication error, logout user
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
