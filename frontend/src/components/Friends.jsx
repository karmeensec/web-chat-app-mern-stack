import React from "react";
import moment from "moment";

const Friends = ({ friend, userInfo }) => {
  const { friendInfo, messageInfo } = friend;

  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${friendInfo.image}`} alt="" />
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h5>{friendInfo.userName}</h5>

          <div className="msg-time">
            {messageInfo &&
              (messageInfo.senderId === userInfo ? (
                <span>You</span>
              ) : (
                <span> {friendInfo.userName} : </span>
              ))}
            {messageInfo && messageInfo.message.text ? (
              <span> {messageInfo.message.text.slice(0, 10)} </span>
            ) : messageInfo && messageInfo.message.image ? (
              <span> Sent an image </span>
            ) : (
              <span>You are now connected</span>
            )}
            {" - "}
            <span>
              {messageInfo
                ? moment(messageInfo.createdAt).startOf("minute").fromNow()
                : moment(friendInfo.createdAt).startOf("minute").fromNow()}
            </span>
          </div>
        </div>

        {userInfo === messageInfo?.senderId ? (
          <div className="seen-unseen-icon">
            <img src="./logos/seen.png" alt="" />
          </div>
        ) : (
          <div className="seen-unseen-icon">
            <img src="./logos/unseen.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
