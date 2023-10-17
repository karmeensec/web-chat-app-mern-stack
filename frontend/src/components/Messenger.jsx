import React, { useEffect, useState } from "react";
import {
  FaEllipsis,
  FaRegPenToSquare,
  FaSistrix,
  FaRightFromBracket,
  FaMoon,
  FaSun,
} from "react-icons/fa6";
import Friends from "./Friends";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFriends,
  sendUserMessage,
  getUserMessage,
  sendImageMessage,
  seenMessage,
  updateMessage,
  setTheme,
  getTheme,
} from "../store/actions/messengerAction";
import { useRef } from "react";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import useSound from "use-sound";
import notificationSound from "../audio/notification.mp3";
import sendingSound from "../audio/sending.mp3";
import { userLogoutDispatch } from "../store/actions/authAction";

const Messenger = () => {
  const [currentFriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [userSocketMessage, setUserSocketMessage] = useState("");
  const [userTypingMessage, setUserTypingMessage] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [filteredFriends, setFilteredFriends] = useState([]);

  console.log("CurrentFriend", currentFriend);

  const dispatch = useDispatch();

  const {
    friends,
    message,
    messageSendSuccess,
    messageGetSuccess,
    themeMode,
    add_new_user,
  } = useSelector((state) => state.messenger);
  const { userInfo } = useSelector((state) => state.auth);

  console.log("Selector friends: ", friends);
  console.log("Selector message: ", message);

  const scrollingRef = useRef();
  const socketRef = useRef();

  console.log("SocketRef: ", socketRef);

  const [notificationsPlay] = useSound(notificationSound);
  const [sendingsPlay] = useSound(sendingSound);

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

    socketRef.current.on("deliveredMessageResponse", (message) => {
      console.log("All data deliveredMessageResponse messages: ", message);

      dispatch({
        type: "DELIVERED_MESSAGE",
        payload: {
          messageInfo: message,
        },
      });
    });

    socketRef.current.on("messageSeenResponse", (message) => {
      console.log("All data messageSeenResponse messages: ", message);

      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          messageInfo: message,
        },
      });
    });

    socketRef.current.on("seenSuccess", (data) => {
      console.log("All data seenSuccess messages: ", data);

      dispatch({
        type: "SEEN_ALL_SUCCESS",
        payload: data,
      });
    });
  }, []);

  useEffect(() => {
    if (userSocketMessage && currentFriend) {
      if (
        userSocketMessage.senderId === currentFriend._id &&
        userSocketMessage.receiverId === userInfo.id
      ) {
        dispatch({
          type: "USER_SOCKET_MESSAGE",
          payload: {
            message: userSocketMessage,
          },
        });

        dispatch(seenMessage(userSocketMessage));

        socketRef.current.emit("messageSeen", userSocketMessage);

        dispatch({
          type: "UPDATE_FRIEND_MESSAGE",
          payload: {
            messageInfo: userSocketMessage,
            status: "seen",
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

    socketRef.current.on("add_new_user", (userData) => {
      dispatch({
        type: "ADD_NEW_USER",
        payload: {
          add_new_user: userData,
        },
      });
    });
  }, []);

  useEffect(() => {
    dispatch(getUserFriends());

    dispatch({
      type: "ADD_NEW_USER_CLEAR",
    });
  }, [add_new_user]);

  useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0].friendInfo);
    }
  }, [friends]);

  useEffect(() => {
    dispatch(getUserMessage(currentFriend._id));

    if (friends.length > 0) {
    }
  }, [currentFriend?._id]);

  useEffect(() => {
    if (message.length > 0) {
      if (
        message[message.length - 1].senderId !== userInfo.id &&
        message[message.length - 1].status !== "seen"
      ) {
        dispatch({
          type: "UPDATE",
          payload: {
            id: currentFriend._id,
          },
        });

        socketRef.current.emit("seen", {
          senderId: currentFriend.id,
          receiverId: userInfo.id,
        });

        dispatch(
          seenMessage({
            _id: message[message.length - 1]._id,
          })
        );
      }
    }

    dispatch({
      type: "GET_MESSAGE_SUCCESS_CLEAR",
      payload: {},
    });
  }, [messageGetSuccess]);

  useEffect(() => {
    scrollingRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (
      userSocketMessage &&
      userSocketMessage.senderId !== currentFriend._id &&
      userSocketMessage.receiverId === userInfo.id
    ) {
      notificationsPlay();

      toast.success(`${userSocketMessage.senderName} sent a new message`);

      dispatch(updateMessage(userSocketMessage));

      socketRef.current.emit("deliveredMessage", userSocketMessage);

      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          messageInfo: userSocketMessage,
          status: "delivered",
        },
      });
    }
  }, [userSocketMessage]);

  const handleClickFriend = (friend) => {
    setCurrentFriend(friend.friendInfo);
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

    sendingsPlay();

    console.log("New Message: ", newMessage);

    const data = {
      senderName: userInfo.userName,
      receiverId: currentFriend._id,
      message: newMessage,
    };

    socketRef.current.emit("typeInputMessage", {
      senderId: userInfo.id,
      receiverId: currentFriend._id,
      message: "",
    });

    dispatch(sendUserMessage(data));

    setNewMessage("");
  };

  useEffect(() => {
    if (messageSendSuccess) {
      console.log("Message length: ", message[message.length - 1]);
      socketRef.current.emit("sendMessage", message[message.length - 1]);

      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          messageInfo: message[message.length - 1],
        },
      });

      dispatch({
        type: "SEND_MESSAGE_SUCCESS_CLEAR",
      });
    }
  }, [messageSendSuccess]);

  const sendEmoji = (emoji) => {
    console.log("Emoji: ", emoji);

    setNewMessage(`${newMessage} ` + emoji);

    socketRef.current.emit("typeInputMessage", {
      senderId: userInfo.id,
      receiverId: currentFriend._id,
      message: emoji,
    });
  };

  const sendImage = (e) => {
    console.log("Image: ", e.target.files[0]);

    if (e.target.files.length !== 0) {
      sendingsPlay();

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

  const handleHiddenMenuClick = () => {
    setIsHidden((prev) => !prev);
  };

  const handleLogoutClick = () => {
    dispatch(userLogoutDispatch());

    socketRef.current.emit("logout", userInfo.id);
  };

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  const handleSearchFriendChange = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredFriends = friends.filter((friend) =>
      friend.friendInfo.userName.toLowerCase().includes(searchValue)
    );

    setFilteredFriends(filteredFriends);

    console.log("Filtered Friends:", filteredFriends);
  };

  return (
    <div className={themeMode === "night" ? "messenger theme" : "messenger"}>
      <Toaster
        position={"top-right"}
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "1.1rem",
          },
        }}
      />

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
                <div className="icon" onClick={handleHiddenMenuClick}>
                  <FaEllipsis />
                </div>

                <div className="icon">
                  <FaRegPenToSquare />
                </div>

                <div
                  className={isHidden ? "theme_logout" : "theme_logout show"}
                >
                  <h3>Night/Light Mode</h3>

                  <div className="on">
                    <label htmlFor="night">
                      On <FaMoon />
                    </label>
                    <input
                      type="radio"
                      name="theme"
                      id="night"
                      value="night"
                      onChange={handleThemeChange}
                    />
                  </div>

                  <div className="off">
                    <label htmlFor="light">
                      Off <FaSun />
                    </label>
                    <input
                      type="radio"
                      name="theme"
                      id="light"
                      value="light"
                      onChange={handleThemeChange}
                    />
                  </div>

                  <div className="logout" onClick={handleLogoutClick}>
                    Sign Out <FaRightFromBracket />
                  </div>
                </div>
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                  onChange={handleSearchFriendChange}
                />
                <button>
                  <FaSistrix />
                </button>
              </div>
            </div>

            {/* <div className="active-friends">
              {activeUsers && activeUsers.length > 0
                ? activeUsers.map((activeUser) => (
                    <ActiveFriend
                      activeUser={activeUser}
                      setCurrentFriend={setCurrentFriend}
                    />
                  ))
                : ""}
            </div> */}
            <div className="friends">
              {(filteredFriends.length > 0 ? filteredFriends : friends).map(
                (friend) => (
                  <div
                    className={
                      currentFriend._id === friend.friendInfo._id
                        ? "hover-friend active"
                        : "hover-friend"
                    }
                    key={friend.friendInfo._id}
                    onClick={() => handleClickFriend(friend)}
                  >
                    <Friends
                      friend={friend}
                      idUser={userInfo.id}
                      activeUsers={activeUsers}
                    />
                  </div>
                )
              )}
              {friends.length === 0 && filteredFriends.length === 0 && (
                <div className="center">You don't have any friends</div>
              )}
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
          <div
            className="center"
            style={{
              display: "flex",
              justifyContent: "center ",
              margin: "auto",
            }}
          >
            Tap to any friends to chat
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
