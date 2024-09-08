import React from 'react';
import './User1Layout.css';
import './UserPage.css';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput'; // Import the MessageInput component

export default function UserLayout() {
  return (

    <div className="user-layout">
      <div className="user-left">
        <p>User 1</p>
      </div>
      <div className="chat-container">
        <div>
         <input type="text" Placeholder = "Enter Email"/>
         <input type="text" Placeholder = "Enter UserName"/>
</div>
      </div>
      <div className="user-right">
        <p>User 2</p>
      </div>
    </div>
  );
}