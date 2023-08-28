import { GET_FRIEND_SUCCESS } from "../types/messengerType";

const messengerState = {
  friends: [],
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;

  if (type === GET_FRIEND_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }

  return state;
};
