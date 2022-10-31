import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`; // This is a restricted resource so we need to show a valid user JWT token.

  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const resp = await customFetch.get(url);
    // console.log(`@getAllJobs`, resp.data); // {jobs: Array(10), totalJobs: 75, numOfPages: 8}

    return resp.data; // {jobs:[],totalJobs:number, numOfPages:number } // Pagination handled on the server and returns 1st page and 10 jobs by default
  } catch (error) {
    // Either 404 Not Found (ie wrong url) or a 500 internal server error so we could just hardcode the error
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    // return thunkAPI.rejectWithValue("There was an error");

    // Handles 401 Unauthorized - ex: token expired, invalid, etc.
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs/stats");
    console.log(resp.data);
    return resp.data; // {defaultStats: {pending, interview, declined}, monthlyApplications: Array(6)}
  } catch (error) {
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
