import React from "react";
import { FaGears, FaUserLock, FaImages } from "react-icons/fa6";

const FriendInfo = () => {
  return (
    <div className="friend-info">
      <div className="image-name">
        <div className="image">
          <img src="" alt="" />
        </div>

        <div className="active-user">Active</div>

        <div className="name">
          <h4>Kamil Isma</h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Customize chat</h3>
          <FaGears />
        </div>

        <div className="privacy">
          <h3>Support and Privacy</h3>
          <FaUserLock />
        </div>

        <div className="media">
          <h3>Shared Media</h3>
          <FaImages />
        </div>
      </div>

      <div className="gallery">
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default FriendInfo;
