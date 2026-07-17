import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/hooks/useAuth";
import { toast } from "react-toastify";
import { setCurrentChatId } from "../chat.slice";

const Dashboard = () => {
  const chat = useChat();
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  
  const user = useSelector((state) => state.auth.user);
  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    chat.initializeSocketConnection();
    loadChats();
  }, []);

  useEffect(() => {
    if (chat.currentChatId) {
      loadMessages(chat.currentChatId);
    }
  }, [chat.currentChatId]);

  const loadChats = async () => {
    try {
      await chat.handleGetChat();
    } catch (error) {
      toast.error("Failed to load chats");
    }
  };

  const loadMessages = async (chatId) => {
    try {
      setIsLoading(true);
      const response = await chat.handleGetMessage(chatId);
      setMessages(response.messages || []);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to load messages");
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      toast.warning("Please enter a message");
      return;
    }

    try {
      setIsLoading(true);
      const response = await chat.handleSendMessage({
        message: inputValue,
        chatId: chat.currentChatId,
      });

      setMessages((prev) => [...prev, response.userMessage, response.aiMessage]);
      setInputValue("");
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to send message");
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    reduxDispatch(setCurrentChatId(null));
    setMessages([]);
    setInputValue("");
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await chat.handleDeleteChat(chatId);
      toast.success("Chat deleted successfully");
      if (chat.currentChatId === chatId) {
        handleNewChat();
      }
    } catch (error) {
      toast.error("Failed to delete chat");
    }
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="dashboard-main">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2 className="perplexity-heading">Perplexity</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          + New Chat
        </button>

        <div className="chats-list">
          <h3>Chat History</h3>
          {chat.chats && Array.isArray(chat.chats) && chat.chats.length > 0 ? (
            <div className="chats-scroll">
              {chat.chats.map((chatItem) => (
                <div
                  key={chatItem._id}
                  className={`chat-item ${
                    chat.currentChatId === chatItem._id ? "active" : ""
                  }`}
                  onClick={() => {
                    if (chat.currentChatId !== chatItem._id) {
                      reduxDispatch(setCurrentChatId(chatItem._id));
                    }
                  }}
                >
                  <div className="chat-item-title">{chatItem.title}</div>
                  <button
                    className="delete-chat-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chatItem._id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-chats">No chats yet. Start a new conversation!</p>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <p>{user?.username || "User"}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <button className="logout-btn" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="dashboard-main-content">
        {chat.currentChatId === null || !chat.currentChatId ? (
          <div className="welcome-container">
            <div className="welcome-content">
              <h1>Welcome to Perplexity</h1>
              <p>Ask me anything, and I'll help you find the answers.</p>
              <div className="example-prompts">
                <h3>Try asking:</h3>
                <button
                  onClick={() => {
                    setInputValue("Explain quantum computing in simple terms");
                  }}
                >
                  Explain quantum computing
                </button>
                <button
                  onClick={() => {
                    setInputValue("How to learn web development?");
                  }}
                >
                  How to learn web development?
                </button>
                <button
                  onClick={() => {
                    setInputValue("What is artificial intelligence?");
                  }}
                >
                  What is artificial intelligence?
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-container">
            <div className="messages-box">
              {messages.length === 0 ? (
                <div className="no-messages">
                  <p>Start a new conversation...</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.role === "user" ? "user-msg" : "ai-msg"}`}
                  >
                    <div className="message-avatar">
                      {msg.role === "user" ? "👤" : "🤖"}
                    </div>
                    <div className="message-content">{msg.content}</div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="message ai-msg">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="search-box">
              <textarea
                type="text"
                placeholder="Type your message... (Shift+Enter for new line, Enter to send)"
                className="search-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                rows="3"
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
