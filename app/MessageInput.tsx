import React from 'react';
import './MessageInput.css';
import { FiSend } from 'react-icons/fi';

export default function MessageInput() {
  return (
    <div className="message-input-container">
      <input
        type="text"
        className="message-input"
        placeholder="Type your message..."
      />
      <button className="send-button">
        <FiSend size={20} /> {/* Include the send icon */}
      </button>
    </div>
  );
}