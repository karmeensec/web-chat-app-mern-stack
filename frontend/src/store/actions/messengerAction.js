import axios from "axios";

export const getUserFriends = () => {
  return async (dispatch) => {
    console.log("User friends get check!");

    try {
      const response = await axios.get("/api/messenger/get-friends");
      console.log("Response data is:", response.data);
    } catch (error) {
      console.log("Error response data is: ", error.response.data);
    }
  };
};
