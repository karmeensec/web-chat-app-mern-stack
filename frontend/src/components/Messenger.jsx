import React from "react";
import { FaEllipsis, FaRegPenToSquare, FaSistrix } from "react-icons/fa6";

const Messenger = () => {
  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src="./images/" alt="" />
                </div>

                <div className="name">
                  <h3>Hi Me</h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <FaEllipsis />
                </div>

                <div className="icon">
                  <FaRegPenToSquare />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
                <button>
                  <FaSistrix />
                </button>
              </div>
            </div>

            <div className="active-friends"></div>
            <div className="friends">
              <div className="hover-friend"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
