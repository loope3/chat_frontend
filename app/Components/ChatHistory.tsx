import React from 'react';
import './ChatHistory.css'; // Create this CSS file for styling

export default function ChatHistory() {
  return (
    <div className="chat-history">
      {/* Example messages */}
      <div className="message">User 1: This is the chat history!</div>
      <div className="message">User 2: Hi there!</div>
      <div className="message">User 1: How are you?</div>
    </div>
  );
}