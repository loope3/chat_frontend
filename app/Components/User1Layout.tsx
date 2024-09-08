import React from 'react';
import './User1Layout.css';
import ChatHistory from './ChatHistory'; 
import MessageInput from './MessageInput'; // Import the MessageInput component

export default function UserLayout() {
  return (

    <div className="user-layout">
      <div className="user-left">
        <p>User 1</p>
      </div>
      <div className="chat-container">
        <ChatHistory />
        <MessageInput />
      </div>
      <div className="user-right">
        <p>User 2</p>
      </div>
    </div>
  );
}