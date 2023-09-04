import {
  GET_FRIEND_SUCCESS,
  GET_MESSAGE_SUCCESS,
} from "../types/messengerType";

const messengerState = {
  friends: [],
  message: [],
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === GET_FRIEND_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }

  if (type === GET_MESSAGE_SUCCESS) {
    return {
      ...state,
      message: payload.message,
    };
  }

  return state;
};
