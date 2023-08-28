import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterDispatch } from "../store/actions/authAction.js";
import { useAlert } from "react-alert";
import {
  CLEAR_ERROR_MESSAGE,
  CLEAR_SUCCESS_MESSAGE,
} from "../store/types/authTypes.js";

const Register = () => {
  const [userRegister, setUserRegister] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loadImage, setLoadImage] = useState("");

  const dispatch = useDispatch();

  const alert = useAlert();

  const { authenticate, error, successMessage, userInfo } = useSelector(
    (state) => state.auth
  );

  console.log("User Register Info: ", userInfo);

  const navigate = useNavigate();

  /* ********************************************** */

  const handleInputRegisterChange = (e) => {
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileRegisterChange = (e) => {
    if (e.target.files.length !== 0) {
      setUserRegister({
        ...userRegister,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLoadImage(reader.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("User Register State", userRegister);

    const { userName, email, password, confirmPassword, image } = userRegister;

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);

    dispatch(userRegisterDispatch(formData));
    console.log("User Register Form Data: ", formData);
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
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username*"
                id="username"
                className="form-control"
                name="userName"
                value={userRegister.userName}
                onChange={handleInputRegisterChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email*"
                id="email"
                className="form-control"
                name="email"
                value={userRegister.email}
                onChange={handleInputRegisterChange}
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
                value={userRegister.password}
                onChange={handleInputRegisterChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password*"
                id="confirmPassword"
                className="form-control"
                name="confirmPassword"
                value={userRegister.confirmPassword}
                onChange={handleInputRegisterChange}
              />
            </div>

            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="" /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    name="image"
                    onChange={handleFileRegisterChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>

            <div className="form-group">
              <span>
                <Link to="/messenger/login">Login to your Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
