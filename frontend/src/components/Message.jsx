import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const Message = ({
  currentFriend,
  message,
  scrollingRef,
  userTypingMessage,
}) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m, index) =>
            m.senderId === userInfo.id ? (
              <div className="my-message" ref={scrollingRef} key={index}>
                <div className="image-message">
                  <div className="my-text">
                    <p className="message-text">
                      {m.message.text === "" ? (
                        <img src={`./images/${m.message.image}`} alt="" />
                      ) : (
                        m.message.text
                      )}
                    </p>

                    {index === message.length - 1 &&
                    m.senderId === userInfo.id ? (
                      m.status === "seen" ? (
                        <img
                          className="img"
                          src={`./images/${currentFriend.image}`}
                          alt=""
                        />
                      ) : m.status === "delivered" ? (
                        <img className="img" src="./logos/unseen.png" alt="" />
                      ) : (
                        <img className="img" src="./logos/unseen.png" alt="" />
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="time">
                  {moment(m.createdAt).startOf("minute").fromNow()}
                </div>
              </div>
            ) : (
              <div className="friend-message" ref={scrollingRef} key={index}>
                <div className="image-message-time">
                  <img src={`./images/${currentFriend.image}`} alt="" />

                  <div className="message-time">
                    <div className="friend-text">
                      <p className="message-text">
                        {m.message.text === "" ? (
                          <img src={`./images/${m.message.image}`} alt="" />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>

                    <div className="time">
                      {moment(m.createdAt).startOf("minute").fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={`./images/${currentFriend.image}`} alt="" />
            <h3> {currentFriend.userName} </h3>
            <span>You are now connected</span>
            <h5>
              {moment(currentFriend.createdAt).startOf("minute").fromNow()}
            </h5>
          </div>
        )}
      </div>

      {userTypingMessage &&
        userTypingMessage.message &&
        userTypingMessage.senderId === currentFriend._id && (
          <div className="typing-message">
            <div className="friend-message">
              <div className="image-message-time">
                <img src={`./images/${currentFriend.image}`} alt="" />

                <div className="message-time">
                  <div className="friend-text">
                    <p className="time">Typing...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Message;
