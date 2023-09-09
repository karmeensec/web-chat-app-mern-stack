import axios from "axios";
import {
  GET_FRIEND_SUCCESS,
  GET_MESSAGE_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  THEME_GET_SUCCESS,
  THEME_SET_SUCCESS,
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
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        "/api/messenger/image-message-send",
        data,
        config
      );

      console.log("sendImageMessage Response Message: ", response.data);

      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    } catch (error) {
      console.log("Send Image Message error: ", error.response.data);
    }
  };
};

export const seenMessage = (message) => {
  return async (dispatch) => {
    console.log("Seen Message: ", message);

    try {
      const response = await axios.post("/api/messenger/seen-message", message);

      console.log("Seen Message Response Message: ", response.data);
    } catch (error) {
      console.log("Seen Message error: ", error.response.data);
    }
  };
};

export const updateMessage = (message) => {
  return async (dispatch) => {
    console.log("UpdateMessage Message: ", message);

    try {
      const response = await axios.post(
        "/api/messenger/delivered-message",
        message
      );

      console.log("UpdateMessage Response Message: ", response.data);
    } catch (error) {
      console.log("UpdateMessage error: ", error.response.data);
    }
  };
};

export const setTheme = (theme) => {
  return async (dispatch) => {
    localStorage.setItem("theme", theme);

    dispatch({
      type: THEME_SET_SUCCESS,
      payload: {
        theme: theme,
      },
    });
  };
};
export const getTheme = () => {
  return async (dispatch) => {
    const theme = localStorage.getItem("theme");

    dispatch({
      type: THEME_GET_SUCCESS,
      payload: {
        theme: theme ? theme : "light",
      },
    });
  };
};
