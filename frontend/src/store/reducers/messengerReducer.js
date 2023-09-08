import {
  DELIVERED_MESSAGE,
  GET_FRIEND_SUCCESS,
  GET_MESSAGE_SUCCESS,
  SEEN_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_SUCCESS_CLEAR,
  UPDATE,
  UPDATE_FRIEND_MESSAGE,
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

  if (type === UPDATE_FRIEND_MESSAGE) {
    const index = state.friends.findIndex(
      (friend) =>
        friend.friendInfo._id === payload.messageInfo.receiverId ||
        friend.friendInfo._id === payload.messageInfo.senderId
    );

    state.friends[index].messageInfo = payload.messageInfo;

    state.friends[index].messageInfo.status = payload.status;

    return state;
  }

  if (type === SEND_MESSAGE_SUCCESS_CLEAR) {
    return {
      ...state,
      messageSendSuccess: false,
    };
  }

  if (type === SEEN_MESSAGE) {
    const index = state.friends.findIndex(
      (friend) =>
        friend.friendInfo._id === payload.messageInfo.receiverId ||
        friend.friendInfo._id === payload.messageInfo.senderId
    );

    state.friends[index].messageInfo.status = "seen";

    return { ...state };
  }

  if (type === DELIVERED_MESSAGE) {
    const index = state.friends.findIndex(
      (friend) =>
        friend.friendInfo._id === payload.messageInfo.receiverId ||
        friend.friendInfo._id === payload.messageInfo.senderId
    );

    state.friends[index].messageInfo.status = "delivered";

    return { ...state };
  }

  if (type === UPDATE) {
    const index = state.friends.findIndex(
      (friend) => friend.friendInfo._id === payload.id
    );

    if (state.friends[index].messageInfo) {
      state.friends[index].messageInfo.status = "seen";
    }

    return { ...state };
  }

  return state;
};
