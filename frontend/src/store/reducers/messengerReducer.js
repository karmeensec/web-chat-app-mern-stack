import {
  GET_FRIEND_SUCCESS,
  GET_MESSAGE_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  USER_SOCKET_MESSAGE,
} from "../types/messengerType";

const messengerState = {
  friends: [],
  message: [],
  messageSendSuccess: false,
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === GET_FRIEND_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }

  if (type === SEND_MESSAGE_SUCCESS) {
    return {
      ...state,
      messageSendSuccess: true,
      message: [...state.message, payload.message],
    };
  }

  if (type === GET_MESSAGE_SUCCESS) {
    return {
      ...state,
      message: payload.message,
    };
  }

  if (type === USER_SOCKET_MESSAGE) {
    return {
      ...state,
      message: [...state.message, payload.message],
    };
  }

  return state;
};
