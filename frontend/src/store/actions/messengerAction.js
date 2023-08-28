import axios from "axios";
import { GET_FRIEND_SUCCESS } from "../types/messengerType";

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
