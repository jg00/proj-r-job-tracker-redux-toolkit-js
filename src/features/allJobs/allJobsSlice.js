// Main purpose is to get all jobs and filter jobs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false, // IMPORTANT: When deleting a job we also want to update isLoading when refreshing the jobs list. However note that our deleteJob request async action creator will be in a different slice ie from jobSlice.js (see note below)
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

// Async Action Creators - dispatch after JobsContainer component loads
export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk);

// Dispatched after Stats.js page load
export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true; // IMPORTANT: When deleting a job we also want to update isLoading when refreshing the jobs list. However note that our deleteJob request async action creator will be in a different slice ie from jobSlice.js (see note below)
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },

    // For search
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1; // Solution to reset page for any search form change in order to send proper request to the server
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    // Ref PageBtnContainer
    changePage: (state, { payload }) => {
      state.page = payload;
    },

    clearAllJobsState: (state) => initialState,
  },
  extraReducers: {
    // action type allJobs/getAllJobs/pending
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs; // Default returns 10 jobs or less
      // For Pagination (also returned from server request); See JobsContainer, PageBtnContainer component where used.
      state.numOfPages = payload.numOfPages;
      state.totalJobs = payload.totalJobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // action type allJobs/showStats/pending
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyApplications = payload.monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

// Action Creators - Imported in jobSlice.js and used there when we click delete in Job component
export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;

/*
IMPORTANT NOTE on deleting a job and how do we display a spinner when deleting a job.
1 The delete job async action creator will either be in this slice allJobsSlice or in our case we placed in jobSlice.
2 When deleting a job however we want to control the allJobsSlice isLoading property
3 Our option is 
  a. either we set up delete job request in allJobSlice or
  b. we need to somehow someway access allJobsSlice isLoading from jobSlice <- This is what we went with
4 In addition we need to have access to showLoading and hideLoading from jobSlice. 
*/
