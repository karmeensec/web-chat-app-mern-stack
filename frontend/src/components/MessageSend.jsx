import React from "react";
import {
  FaFileCirclePlus,
  FaFileImage,
  FaGift,
  FaRegPaperPlane,
  FaShieldHeart,
} from "react-icons/fa6";

const MessageSend = () => {
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
          placeholder="Aahahahaha"
          className="form-control"
        />

        <div className="file hover-gift">
          <label htmlFor="emoji">
            <FaRegPaperPlane />
          </label>
        </div>
      </div>

      <div className="file">
        <FaShieldHeart />
      </div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((emoji) => (
            <span>{emoji}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;