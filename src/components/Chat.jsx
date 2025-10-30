import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { targetUserId } = useParams();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const connection = location.state?.connection; // 👈 get the data we passed

  // create a ref for the chat container
  const chatContainerRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        createdAt,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, createdAt }) => {
      const timestamp = createdAt || new Date().toISOString(); // fallback
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text, createdAt: timestamp },
      ]);
    });

    socket.on("errorMessage", (msg) => {
      toast.error(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const trimmedMessage = newMessage.trim();

    // ✅ Validate input
    if (!trimmedMessage) {
      toast.error("Message cannot be empty!");
      return;
    }

    if (trimmedMessage.length > 500) {
      toast.error("Message too long! Limit 500 characters.");
      return;
    }

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: trimmedMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-3/4 mx-auto my-6 h-[75vh] flex flex-col border border-gray-700 rounded-xl shadow-xl overflow-hidden bg-gradient-to-b from-gray-900 via-gray-950 to-black transition-all duration-300">
      <Toaster position="top-center" />

      {/* 💬 Header */}
      <div className="p-5 border-b border-gray-800 flex items-center gap-3 bg-gray-900/80 backdrop-blur-md">
        <img
          src={connection?.photoUrl}
          alt="User"
          className="w-12 h-12 rounded-full object-cover border-2 border-pink-500 shadow-md"
        />
        <div>
          <div className="font-semibold text-lg text-white tracking-wide flex items-center gap-2">
            {connection?.firstName} {connection?.lastName}
          </div>
        </div>
      </div>

      {/* 💭 Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-gray-950 to-gray-900 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="text-gray-500 text-center my-10 italic">
            Start the conversation ✨
          </div>
        )}

        {messages.map((msg, index) => {
          const isSender = user.firstName === msg.firstName;
          return (
            <div
              key={index}
              className={`chat mb-4 ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header mb-1 text-gray-400 text-xs">
                {new Date(msg.createdAt).toLocaleString("en-US", {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>

              <div
                className={`chat-bubble max-w-[70%] px-4 py-2 rounded-2xl font-medium text-sm shadow-md transition-all duration-200 ${
                  isSender
                    ? "bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white hover:shadow-pink-500/30"
                    : "bg-gray-800 text-gray-200 border border-gray-700 hover:shadow-gray-600/30"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* ✍️ Input Bar */}
      <div className="p-4 border-t border-gray-800 flex items-center gap-3 bg-gray-900/90 backdrop-blur-md">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-full px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-600 shadow-inner transition-all duration-200"
        />
        <button
          onClick={sendMessage}
          className="btn bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white rounded-full px-6 py-2 font-semibold hover:from-pink-500 hover:to-fuchsia-500 shadow-lg hover:shadow-pink-500/40 transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
