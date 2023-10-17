import React from "react";
import moment from "moment";

const Friends = ({ friend, idUser, activeUsers }) => {
  const { friendInfo, messageInfo } = friend;

  console.log("Active users: ", activeUsers);

  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${friendInfo.image}`} alt="" />

          {activeUsers &&
          activeUsers.length > 0 &&
          activeUsers.some(
            (activeUser) => activeUser.userInfoId === friendInfo._id
          ) ? (
            <div className="active_icon"></div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h5
            className={
              messageInfo?.senderId !== idUser &&
              messageInfo?.status !== undefined &&
              messageInfo?.status !== "seen"
                ? "unseen_message"
                : ""
            }
          >
            {friendInfo.userName}
          </h5>

          <div className="msg-time">
            {messageInfo &&
              (messageInfo.senderId === idUser ? (
                <span>You</span>
              ) : (
                <span
                  className={
                    messageInfo?.senderId !== idUser &&
                    messageInfo?.status !== undefined &&
                    messageInfo?.status !== "seen"
                      ? "unseen_message"
                      : ""
                  }
                >
                  {" "}
                  {friendInfo.userName} :{" "}
                </span>
              ))}
            {messageInfo && messageInfo.message.text ? (
              <span
                className={
                  messageInfo?.senderId !== idUser &&
                  messageInfo?.status !== undefined &&
                  messageInfo?.status !== "seen"
                    ? "unseen_message"
                    : ""
                }
              >
                {" "}
                {messageInfo.message.text.slice(0, 10)}{" "}
              </span>
            ) : messageInfo && messageInfo.message.image ? (
              <span
                className={
                  messageInfo?.senderId !== idUser &&
                  messageInfo?.status !== undefined &&
                  messageInfo?.status !== "seen"
                    ? "unseen_message"
                    : ""
                }
              >
                {" "}
                Sent an image{" "}
              </span>
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

        {idUser === messageInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {messageInfo.status === "seen" ? (
              <img src="./logos/seen.png" alt="" />
            ) : messageInfo.status === "delivered" ? (
              <img src="./logos/unseen.png" alt="" />
            ) : (
              <img src="./logos/unseen.png" alt="" />
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {messageInfo?.status !== undefined &&
            messageInfo?.status !== "seen" ? (
              <img src="./logos/unseen.png" alt="" />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
