import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoginDispatch } from "../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  CLEAR_ERROR_MESSAGE,
  CLEAR_SUCCESS_MESSAGE,
} from "../store/types/authTypes";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const alert = useAlert();

  const { authenticate, error, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  console.log("User Login Info: ", userInfo);

  const navigate = useNavigate();

  /* ********************************************** */

  const handleInputLoginChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    console.log("User Login State", userLogin);

    dispatch(userLoginDispatch(userLogin));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }

    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: CLEAR_SUCCESS_MESSAGE });
    }

    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: CLEAR_ERROR_MESSAGE });
    }
  }, [successMessage, error]);

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email*"
                id="email"
                className="form-control"
                name="email"
                value={userLogin.email}
                onChange={handleInputLoginChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password*"
                id="password"
                className="form-control"
                name="password"
                value={userLogin.password}
                onChange={handleInputLoginChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="login" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/messenger/register">Don't have an Account?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
