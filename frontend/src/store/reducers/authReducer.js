import { REGISTER_FAIL, REGISTER_SUCCESS } from "../types/authTypes";
import deCodeToken from "jwt-decode";

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  userInfo: "",
};

const tokenDecode = (token) => {
  const decodedToken = deCodeToken(token);
  const expiryTime = new Date(decodedToken.exp * 1000);

  if (new Date() > expiryTime) {
    return null;
  }
  return decodedToken;
};

const getToken = localStorage.getItem("authToken");

if (getToken) {
  const getInfo = tokenDecode(getToken);
  if (getInfo) {
    authState.userInfo = getInfo;
    authState.authenticate = true;
    authState.loading = false;
  }
}

console.log("Get Token: ", getToken);

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;

  if (type === REGISTER_FAIL) {
    return {
      ...state,
      error: payload.error,
      loading: true,
      authenticate: false,
      userInfo: "",
    };
  }

  if (type === REGISTER_SUCCESS) {
    const userInfo = tokenDecode(payload.token);

    return {
      ...state,
      userInfo: userInfo,
      successMessage: payload.successMessage,
      error: "",
      loading: false,
      authenticate: true,
    };
  }

  return state;
};
