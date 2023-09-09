import React from "react";
import { FaGears, FaUserLock, FaImages } from "react-icons/fa6";

const FriendInfo = ({ currentFriend, activeUsers, message }) => {
  return (
    <div className="friend-info">
      <input type="checkbox" name="" id="gallery" />

      <div className="image-name">
        <div className="image">
          <img src={`./images/${currentFriend.image}`} alt="" />
        </div>

        {activeUsers &&
        activeUsers.length > 0 &&
        activeUsers.some(
          (activeUser) => activeUser.userInfoId === currentFriend._id
        ) ? (
          <div className="active-user">Active</div>
        ) : (
          <div className="inactive-user">Inactive</div>
        )}

        <div className="name">
          <h4>{currentFriend.userName}</h4>
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
          <label htmlFor="gallery">
            <FaImages />
          </label>
        </div>
      </div>

      <div className="gallery">
        {message &&
          message.length > 0 &&
          message.map(
            (m, index) =>
              m.message.image && (
                <img src={`./images/${m.message.image}`} alt="" key={index} />
              )
          )}
      </div>
    </div>
  );
};

export default FriendInfo;
