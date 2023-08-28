import React, { useEffect, useState } from "react";
import { FaEllipsis, FaRegPenToSquare, FaSistrix } from "react-icons/fa6";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { getUserFriends } from "../store/actions/messengerAction";

const Messenger = () => {
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  console.log("CurrentFriend", currentFriend);

  const dispatch = useDispatch();

  const { friends } = useSelector((state) => state.messenger);
  const { userInfo } = useSelector((state) => state.auth);

  console.log("Selector friends: ", friends);

  useEffect(() => {
    dispatch(getUserFriends());
  }, []);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

  const handleClickFriend = (friend) => {
    setCurrentFriend(friend);
  };

  const handleInputMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessageClick = (e) => {
    e.preventDefault();
    console.log("New Message: ", newMessage);
  };

  return (
    <div className="messenger">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./images/${userInfo.image}`} alt="" />
                </div>

                <div className="name">
                  <h3>{userInfo.userName}</h3>
                </div>
              </div>

              <div className="icons">
                <div className="icon">
                  <FaEllipsis />
                </div>

                <div className="icon">
                  <FaRegPenToSquare />
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
                <button>
                  <FaSistrix />
                </button>
              </div>
            </div>

            <div className="active-friends">
              <ActiveFriend />
            </div>
            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((friend) => (
                    <div
                      className={
                        currentFriend._id === friend._id
                          ? "hover-friend active"
                          : "hover-friend"
                      }
                      key={friend._id}
                      onClick={() => handleClickFriend(friend)}
                    >
                      <Friends friend={friend} />
                    </div>
                  ))
                : "You don't have any friends"}
            </div>
          </div>
        </div>

        {currentFriend ? (
          <Chat
            currentFriend={currentFriend}
            handleInputMessageChange={handleInputMessageChange}
            newMessage={newMessage}
            handleSendMessageClick={handleSendMessageClick}
          />
        ) : (
          "Tap to any friends to chat"
        )}
      </div>
    </div>
  );
};

export default Messenger;
