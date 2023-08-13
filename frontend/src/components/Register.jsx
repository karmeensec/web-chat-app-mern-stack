import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userRegister, setUserRegister] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

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
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("User State", userRegister);
  };

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
                <div className="image"></div>
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
