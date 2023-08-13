import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email*"
                id="email"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password*"
                id="password"
                className="form-control"
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
