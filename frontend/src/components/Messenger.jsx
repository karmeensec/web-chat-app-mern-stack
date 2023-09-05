import React, { useEffect, useState } from "react";
import { FaEllipsis, FaRegPenToSquare, FaSistrix } from "react-icons/fa6";
import ActiveFriend from "./ActiveFriend";
import Friends from "./Friends";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFriends,
  sendUserMessage,
  getUserMessage,
  sendImageMessage,
} from "../store/actions/messengerAction";
import { useRef } from "react";
import { io } from "socket.io-client";
import { USER_SOCKET_MESSAGE } from "../store/types/messengerType";

const Messenger = () => {
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [userSocketMessage, setUserSocketMessage] = useState("");
  const [userTypingMessage, setUserTypingMessage] = useState("");

  console.log("CurrentFriend", currentFriend);

  const dispatch = useDispatch();

  const { friends, message } = useSelector((state) => state.messenger);
  const { userInfo } = useSelector((state) => state.auth);

  console.log("Selector friends: ", friends);
  console.log("Selector message: ", message);

  const scrollingRef = useRef();
  const socketRef = useRef();

  console.log("SocketRef: ", socketRef);

  useEffect(() => {
    socketRef.current = io("ws://localhost:8000");

    socketRef.current.on("getMessage", (data) => {
      console.log("All data messages: ", data);

      setUserSocketMessage(data);
    });

    socketRef.current.on("getTypeInputMessage", (data) => {
      console.log("All data getTypeInputMessage messages: ", data);

      setUserTypingMessage(data);
    });
  }, []);

  useEffect(() => {
    if (userSocketMessage && currentFriend) {
      if (
        userSocketMessage.senderId === currentFriend._id &&
        userSocketMessage.receiverId === userInfo.id
      ) {
        dispatch({
          type: USER_SOCKET_MESSAGE,
          payload: {
            message: userSocketMessage,
          },
        });
      }
    }

    setUserSocketMessage("");
  }, [userSocketMessage]);

  useEffect(() => {
    socketRef.current.emit("addUser", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    socketRef.current.on("getUser", (users) => {
      console.log("Users: ", users);

      const filteredUsers = users.filter(
        (user) => user.userInfoId !== userInfo.id
      );

      setActiveUsers(filteredUsers);
    });
  }, []);

  useEffect(() => {
    dispatch(getUserFriends());
  }, []);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

  useEffect(() => {
    dispatch(getUserMessage(currentFriend._id));
  }, [currentFriend?._id]);

  useEffect(() => {
    scrollingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handleClickFriend = (friend) => {
    setCurrentFriend(friend);
  };

  const handleInputMessageChange = (e) => {
    setNewMessage(e.target.value);

    socketRef.current.emit("typeInputMessage", {
      senderId: userInfo.id,
      receiverId: currentFriend._id,
      message: e.target.value,
    });
  };

  const handleSendMessageClick = (e) => {
    e.preventDefault();
    console.log("New Message: ", newMessage);

    const data = {
      senderName: userInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage,
    };

    socketRef.current.emit("sendMessage", {
      senderId: userInfo.id,
      senderName: userInfo.userName,
      receiverId: currentFriend._id,
      time: new Date(),
      message: {
        text: newMessage,
        image: "",
      },
    });

    socketRef.current.emit("typeInputMessage", {
      senderId: userInfo.id,
      receiverId: currentFriend._id,
      message: "",
    });

    dispatch(sendUserMessage(data));

    setNewMessage("");
  };

  const sendEmoji = (emoji) => {
    console.log("Emoji: ", emoji);

    setNewMessage(`${newMessage} ` + emoji);
  };

  const sendImage = (e) => {
    console.log("Image: ", e.target.files[0]);

    if (e.target.files.length !== 0) {
      const imageName = e.target.files[0].name;
      const uniqueImageName = Date.now() + "-" + imageName;

      console.log("uniqueImageName: ", uniqueImageName);

      socketRef.current.emit("sendMessage", {
        senderId: userInfo.id,
        senderName: userInfo.userName,
        receiverId: currentFriend._id,
        time: new Date(),
        message: {
          text: "",
          image: uniqueImageName,
        },
      });

      const formData = new FormData();

      formData.append("senderName", userInfo.userName);
      formData.append("receiverId", currentFriend._id);
      formData.append("image", e.target.files[0]);
      formData.append("imageName", uniqueImageName);

      dispatch(sendImageMessage(formData));
    }
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
              {activeUsers && activeUsers.length > 0
                ? activeUsers.map((activeUser) => (
                    <ActiveFriend
                      activeUser={activeUser}
                      setCurrentFriend={setCurrentFriend}
                    />
                  ))
                : ""}
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
            message={message}
            scrollingRef={scrollingRef}
            sendEmoji={sendEmoji}
            sendImage={sendImage}
            activeUsers={activeUsers}
            userTypingMessage={userTypingMessage}
          />
        ) : (
          "Tap to any friends to chat"
        )}
      </div>
    </div>
  );
};

export default Messenger;
