import React from "react";

const Message = ({ currentFriend }) => {
  return (
    <div className="message-show">
      <div className="my-message">
        <div className="image-message">
          <div className="my-text">
            <p className="message-text"> Hi Me, How are you?</p>
          </div>
        </div>

        <div className="time">27 August 2023</div>
      </div>

      <div className="friend-message">
        <div className="image-message-time">
          <img src={`./images/${currentFriend.image}`} alt="" />

          <div className="message-time">
            <div className="friend-text">
              <p className="message-text">I am good</p>
            </div>

            <div className="time">26 August 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
