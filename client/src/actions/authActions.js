import axios from "axios";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

//Register user
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/register", userData)
    .then((res) => history.push("login")) //re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      //Save to local storage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded)); //Call action declared below
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//User loading
export const SetUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

//Logout
export const logoutUser = () => (dispatch) => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header
  setAuthToken(false);
  //Set current user to empty => isAuthenticated=false
  dispatch(setCurrentUser({}));
};
