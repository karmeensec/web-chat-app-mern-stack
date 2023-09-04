import React from "react";
import {
  FaFileCirclePlus,
  FaFileImage,
  FaGift,
  FaRegPaperPlane,
  FaFaceSmile,
} from "react-icons/fa6";

const MessageSend = ({
  handleInputMessageChange,
  newMessage,
  handleSendMessageClick,
  sendEmoji,
  sendImage,
}) => {
  const emojis = [
    "😀",
    "👽",
    "😄",
    "😁",
    "😆",
    "❔",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "🥶",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
  ];

  return (
    <div className="message-send-section">
      <input type="checkbox" name="" id="emoji" />

      <div className="file hover-attachment">
        <div className="add-attachment">Attach files</div>
        <FaFileCirclePlus />
      </div>

      <div className="file hover-image">
        <div className="add-image">Attach an image</div>
        <input
          type="file"
          name=""
          id="pic"
          className="form-control"
          onChange={sendImage}
        />
        <label htmlFor="pic">
          <FaFileImage />
        </label>
      </div>

      <div className="file hover-gift">
        <div className="add-gift">Attach a gift</div>
        <FaGift />
      </div>

      <div className="message-type">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Add your message here..."
          className="form-control"
          onChange={handleInputMessageChange}
          value={newMessage}
        />

        <div className="file hover-gift">
          <label htmlFor="emoji">
            <FaFaceSmile />
          </label>
        </div>
      </div>

      <div className="file" onClick={handleSendMessageClick}>
        <FaRegPaperPlane />
      </div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((emoji) => (
            <span key={emoji} onClick={() => sendEmoji(emoji)}>
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
