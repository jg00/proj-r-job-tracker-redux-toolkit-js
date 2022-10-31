import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { logoutUser } from "./userSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  // console.log(`Register User : ${JSON.stringify(user)}`);

  try {
    // const resp = await customFetch.post("/auth/testingRegister", user); // We get back a user object with the JWT token in the response (note not sent via cookie b/c different domain) -> data: {user: {email: 'john@mail.com', name: 'john', lastName: 'testing last name', location: 'testing location', token: 'testing token'}}
    const resp = await customFetch.post(url, user);
    return resp.data;
    // Important - I think a new action created and dispatched again but now with the payload. Promise resolved returned as action.payload and handled by cb defined in userSlice.extraReducers.registerUser.pending
    // resp.data includes the {user info, token}
  } catch (error) {
    // console.log(error.response); // data: {msg: "please provide all values"}
    // toast.error(error.response.data.msg);
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  // console.log(`Login User : ${JSON.stringify(user)}`);

  try {
    const resp = await customFetch.post(url, user);
    return resp.data; // Again we get back user object with JWT token. Also I think a new action is created but now with the returned payload.
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

// On logout reset all reducers
export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    // logout user
    thunkAPI.dispatch(logoutUser(message));
    // clear jobs value
    thunkAPI.dispatch(clearAllJobsState());
    // clear job input values
    thunkAPI.dispatch(clearValues());

    return Promise.resolve();
  } catch (error) {
    // console.log(error);
    return Promise.reject();
  }
};
