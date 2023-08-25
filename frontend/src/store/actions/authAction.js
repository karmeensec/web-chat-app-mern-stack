import axios from "axios";
import { REGISTER_FAIL } from "../types/authTypes";

export const userRegisterDispatch = (data) => {
  return async (dispatch) => {
    const config = {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data`,
      },
    };

    try {
      const response = await axios.post(
        "/api/messenger/user-register",
        data,
        config
      );
      console.log(response.data);
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.error.errorMessage,
      });
    }
  };
};
