"use client";
import React from 'react';
import './ChatHistory.css';

interface ChatHistoryProps {
  messages: string; // Accepts a single string message
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages && <div className="message">{messages}</div>} {/* Display the message if it exists */}
    </div>
  );
};

export default ChatHistory;