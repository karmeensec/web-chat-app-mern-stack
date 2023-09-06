import React from "react";

const Friends = ({ friend }) => {
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${friend.friendInfo.image}`} alt="" />
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>{friend.friendInfo.userName}</h4>
        </div>
      </div>
    </div>
  );
};

export default Friends;
