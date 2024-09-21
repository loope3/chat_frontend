"use client";
import React from 'react';
import './ChatHistory.css';

export interface Message {
  user: {
    id: string;
    username: string;
  };
  comment: string;
  action: string;
  timestamp: string;
  
}

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <p><strong>{message.user.username}</strong>: {message.comment}</p>
          <p className="timestamp">{message.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;

