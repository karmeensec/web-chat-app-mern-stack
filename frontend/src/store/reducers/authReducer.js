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
