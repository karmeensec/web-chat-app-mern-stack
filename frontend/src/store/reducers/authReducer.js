import { REGISTER_FAIL } from "../types/authTypes";

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  userInfo: "",
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

  return state;
};
