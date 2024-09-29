import React from 'react';
import './ChatHistory.css';

interface ChatHistoryProps {
  messages: string[]; // Accepts an array of strings for multiple messages
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className="message">
          Anonymous: {message}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;