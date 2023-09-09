import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../types/authTypes";

export const userRegisterDispatch = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data`,
      },
    };

    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );

      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: { error: error.response.data.error.errorMessage },
      });
    }
  };
};

export const userLoginDispatch = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "/api/messenger/user-login",
        data,
        config
      );

      localStorage.setItem("authToken", response.data.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: error.response.data.error.errorMessage },
      });
    }
  };
};

export const userLogoutDispatch = () => {
  return async (dispatch) => {
    console.log("User logged out");
    try {
      const response = await axios.post("/api/messenger/user-logout");

      if (response.data.successMessage) {
        localStorage.removeItem("authToken");

        dispatch({
          type: LOGOUT_SUCCESS,
          payload: {
            successMessage: response.data.successMessage,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: { error: error.response.data.error.errorMessage },
      });
    }
  };
};
