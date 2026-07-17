import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authentication/hooks/useAuth";
import { toast } from "react-toastify";
import { setCurrentChatId } from "../chat.slice";

const Dashboard = () => {
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const chat = useChat();
  
  // Redux selectors - these are the SOURCE OF TRUTH
  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  
  // Local component state
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize on mount
  useEffect(() => {
    console.log("Initializing dashboard...");
    chat.initializeSocketConnection();
    loadChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load messages when currentChatId changes
  useEffect(() => {
    console.log("Current chat ID changed to:", currentChatId);
    if (currentChatId) {
      loadMessages(currentChatId);
    } else {
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId]);

  // Load chats from server
  const loadChats = useCallback(async () => {
    try {
      console.log("Loading chats...");
      await chat.handleGetChat();
    } catch (error) {
      console.error("Failed to load chats:", error);
      toast.error("Failed to load chats");
    }
  }, [chat]);

  // Load messages for a specific chat
  const loadMessages = useCallback(async (chatId) => {
    try {
      console.log("Loading messages for chat:", chatId);
      setIsLoading(true);
      const response = await chat.handleGetMessage(chatId);
      setMessages(response.messages || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast.error("Failed to load messages");
      setMessages([]);
      setIsLoading(false);
    }
  }, [chat]);

  // Send message to AI
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) {
      toast.warning("Please enter a message");
      return;
    }

    if (isLoading) return;

    const messageText = inputValue;
    setInputValue("");

    try {
      console.log("Sending message:", messageText, "Chat ID:", currentChatId);
      setIsLoading(true);
      
      const response = await chat.handleSendMessage({
        message: messageText,
        chatId: currentChatId,
      });

      console.log("Response:", response);
      
      if (response.userMessage && response.aiMessage) {
        setMessages((prev) => [...prev, response.userMessage, response.aiMessage]);
        toast.success("Message sent!");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
      setInputValue(messageText); // restore message on error
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, currentChatId, chat, isLoading]);

  // Create new chat
  const handleNewChat = useCallback(() => {
    console.log("Creating new chat...");
    reduxDispatch(setCurrentChatId(null));
    setMessages([]);
    setInputValue("");
  }, [reduxDispatch]);

  // Select a chat from history
  const handleSelectChat = useCallback((chatId) => {
    console.log("Selecting chat:", chatId);
    if (currentChatId !== chatId) {
      reduxDispatch(setCurrentChatId(chatId));
    }
  }, [currentChatId, reduxDispatch]);

  // Delete a chat
  const handleDeleteChat = useCallback(async (chatId) => {
    try {
      console.log("Deleting chat:", chatId);
      await chat.handleDeleteChat(chatId);
      toast.success("Chat deleted successfully");
      
      if (currentChatId === chatId) {
        handleNewChat();
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      toast.error("Failed to delete chat");
    }
  }, [chat, currentChatId, handleNewChat]);

  // Logout
  const handleLogoutClick = useCallback(async () => {
    try {
      console.log("Logging out...");
      await handleLogout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout");
    }
  }, [handleLogout, navigate]);

  // Handle key press in input
  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Handle example prompt click
  const handleExampleClick = useCallback((text) => {
    setInputValue(text);
  }, []);

  return (
    <main className="dashboard-main">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2 className="perplexity-heading">Perplexity</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>

        <button 
          className="new-chat-btn" 
          onClick={handleNewChat}
          title="Start a new chat"
        >
          + New Chat
        </button>

        <div className="chats-list">
          <h3>Chat History</h3>
          {chats && Array.isArray(chats) && chats.length > 0 ? (
            <div className="chats-scroll">
              {chats.map((chatItem) => (
                <div
                  key={chatItem._id}
                  className={`chat-item ${
                    currentChatId === chatItem._id ? "active" : ""
                  }`}
                  onClick={() => handleSelectChat(chatItem._id)}
                  role="button"
                  tabIndex="0"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSelectChat(chatItem._id);
                  }}
                >
                  <div className="chat-item-title" title={chatItem.title}>
                    {chatItem.title}
                  </div>
                  <button
                    className="delete-chat-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chatItem._id);
                    }}
                    title="Delete this chat"
                    aria-label={`Delete chat: ${chatItem.title}`}
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
            <p className="username">{user?.username || "User"}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <button 
            className="logout-btn" 
            onClick={handleLogoutClick}
            title="Logout from your account"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <section className="dashboard-main-content">
        {!currentChatId ? (
          <div className="welcome-container">
            <div className="welcome-content">
              <h1>Welcome to Perplexity</h1>
              <p>Ask me anything, and I'll help you find the answers.</p>
              <div className="example-prompts">
                <h3>Try asking:</h3>
                <button
                  className="prompt-btn"
                  onClick={() =>
                    handleExampleClick("Explain quantum computing in simple terms")
                  }
                >
                  Explain quantum computing
                </button>
                <button
                  className="prompt-btn"
                  onClick={() =>
                    handleExampleClick("How to learn web development?")
                  }
                >
                  How to learn web development?
                </button>
                <button
                  className="prompt-btn"
                  onClick={() =>
                    handleExampleClick("What is artificial intelligence?")
                  }
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
          </div>
        )}

        {/* Input box - shown in both welcome and chat modes */}
        <div className="search-box">
          <textarea
            placeholder="Type your message... (Shift+Enter for new line, Enter to send)"
            className="search-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            rows="3"
            aria-label="Message input"
          />
          <button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={isLoading}
            title="Send message (Enter)"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
