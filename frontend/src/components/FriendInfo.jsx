import React, { useState } from "react";
import { FaGears, FaUserLock, FaImages } from "react-icons/fa6";

const FriendInfo = ({ currentFriend, activeUsers, message }) => {
  const [isShowSupportPrivacy, setIsShowSupportPrivacy] = useState(false);

  const handleToggleSupportPrivacy = () => {
    setIsShowSupportPrivacy((prev) => !prev);
  };

  return (
    <div className="friend-info">
      <input type="checkbox" name="" id="gallery" />

      <div className="image-name">
        <div className="image">
          <img src={`./images/${currentFriend.image}`} alt="" />
        </div>

        {activeUsers &&
        activeUsers.length > 0 &&
        activeUsers.some(
          (activeUser) => activeUser.userInfoId === currentFriend._id
        ) ? (
          <div className="active-user">Active</div>
        ) : (
          <div className="inactive-user">Inactive</div>
        )}

        <div className="name">
          <h4>{currentFriend.userName}</h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Customize chat</h3>
          <FaGears />
        </div>

        <div className="privacy" onClick={handleToggleSupportPrivacy}>
          <h3>Support and Privacy</h3>
          <FaUserLock />
        </div>

        <div className="media">
          <h3>Shared Media</h3>
          <label htmlFor="gallery">
            <FaImages />
          </label>
        </div>
      </div>

      <div className="gallery">
        {message &&
          message.length > 0 &&
          message.map(
            (m, index) =>
              m.message.image && (
                <img src={`./images/${m.message.image}`} alt="" key={index} />
              )
          )}
      </div>

      {isShowSupportPrivacy && (
        <div className="support-privacy-content">
          <h4>Support and Privacy</h4>
          <p>
            We are dedicated to providing a safe and secure messaging experience
            for all users. If you have any questions or concerns regarding our
            privacy policies or need assistance with any aspect of the
            application, please feel free to reach out to our support team.
          </p>
          <p>
            Our commitment to privacy ensures that your personal information is
            protected and never shared with third parties. You can learn more
            about our privacy practices by reviewing our Privacy Policy.
          </p>
          <p>
            For any further inquiries or assistance, please contact our support
            team at support@webchatapp.com.
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendInfo;
