import React from "react";

const ActiveFriend = ({ activeUser }) => {
  return (
    <div className="active-friend">
      <div className="image-active-icon">
        <div className="image">
          <img src={`./images/${activeUser.userInfo.image}`} alt="" />

          <div className="active-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFriend;
