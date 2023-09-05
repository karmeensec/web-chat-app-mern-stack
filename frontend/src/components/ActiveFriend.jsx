import React from "react";

const ActiveFriend = ({ activeUser, setCurrentFriend }) => {
  const handleClickActiveFriend = () => {
    setCurrentFriend({
      _id: activeUser.userInfo.id,
      userName: activeUser.userInfo.userName,
      email: activeUser.userInfo.email,
      image: activeUser.userInfo.image,
    });
  };

  return (
    <div className="active-friend" onClick={handleClickActiveFriend}>
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
