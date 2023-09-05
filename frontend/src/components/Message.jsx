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
        {message && message.length > 0
          ? message.map((m) =>
              m.senderId === userInfo.id ? (
                <div className="my-message" ref={scrollingRef}>
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text">
                        {m.message.text === "" ? (
                          <img src={`./images/${m.message.image}`} alt="" />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="time">27 August 2023</div>
                </div>
              ) : (
                <div className="friend-message" ref={scrollingRef}>
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

                      <div className="time">26 August 2023</div>
                    </div>
                  </div>
                </div>
              )
            )
          : ""}
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
