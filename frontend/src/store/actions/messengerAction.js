import axios from "axios";
import {
  GET_FRIEND_SUCCESS,
  GET_MESSAGE_SUCCESS,
  SEND_MESSAGE_SUCCESS,
} from "../types/messengerType";

export const getUserFriends = () => {
  return async (dispatch) => {
    console.log("User friends get check!");

    try {
      const response = await axios.get("/api/messenger/get-friends");
      console.log("Response data is:", response.data);

      dispatch({
        type: GET_FRIEND_SUCCESS,
        payload: {
          friends: response.data.friends,
        },
      });
    } catch (error) {
      console.log("Error response data is: ", error.response.data);
    }
  };
};

export const sendUserMessage = (data) => {
  return async (dispatch) => {
    console.log("User message send data: ", data);

    try {
      const response = await axios.post("/api/messenger/send-message", data);
      console.log("Send Response Message: ", response.data);

      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (error) {
      console.log("Send User Message error: ", error.response.data);
    }
  };
};

export const getUserMessage = (id) => {
  return async (dispatch) => {
    console.log("getUserMessage id: ", id);

    try {
      const response = await axios.get(`/api/messenger/get-message/${id}`);
      console.log("Get Response Message: ", response.data);

      dispatch({
        type: GET_MESSAGE_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (error) {
      console.log("Get User Message error: ", error.response.data);
    }
  };
};

export const sendImageMessage = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/api/messenger/image-message-send",
        data
      );

      console.log("sendImageMessage Response Message: ", response.data);
    } catch (error) {
      console.log("Send Image Message error: ", error.response.data);
    }
  };
};
