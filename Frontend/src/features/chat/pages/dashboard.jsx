import React from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";

const Dashboard = () => {
  const chat = useChat();

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  useEffect(() => {
    chat.initializeSocketConnection();
  }, []);

  return (
    <main className="dahboard-container">
      <aside>
        <h2 className="perplexity-heading">Perplexity</h2>
      </aside>
      <section className="dashboard-chat-main-box">
        <div className="search-box">
          <input type="text" placeholder="Type your message..." className="search-input"/>
          <button>Send</button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
