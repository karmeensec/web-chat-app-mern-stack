import React from "react";
import { FaPhoneFlip, FaVideo, FaRocketchat } from "react-icons/fa6";
import Message from "./Message";
import MessageSend from "./MessageSend";
import FriendInfo from "./FriendInfo";

const Chat = ({
  currentFriend,
  handleInputMessageChange,
  newMessage,
  handleSendMessageClick,
  message,
  scrollingRef,
  sendEmoji,
  sendImage,
  activeUsers,
  userTypingMessage,
}) => {
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" name="" id="dot" />

        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img src={`./images/${currentFriend.image}`} alt="" />
                    {activeUsers &&
                    activeUsers.length > 0 &&
                    activeUsers.some(
                      (activeUser) =>
                        activeUser.userInfoId === currentFriend._id
                    ) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="name">
                    <h3> {currentFriend.userName} </h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneFlip />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      <FaRocketchat />
                    </label>
                  </div>
                </div>
              </div>

              <Message
                currentFriend={currentFriend}
                message={message}
                scrollingRef={scrollingRef}
                userTypingMessage={userTypingMessage}
              />
              <MessageSend
                handleInputMessageChange={handleInputMessageChange}
                newMessage={newMessage}
                handleSendMessageClick={handleSendMessageClick}
                sendEmoji={sendEmoji}
                sendImage={sendImage}
              />
            </div>
          </div>

          <div className="col-4">
            <FriendInfo
              currentFriend={currentFriend}
              activeUsers={activeUsers}
              message={message}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
