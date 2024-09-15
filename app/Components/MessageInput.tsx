"use client";
import React, { useState } from 'react';
import './MessageInput.css';
import { FiSend } from 'react-icons/fi';
import { Client } from '@stomp/stompjs';

interface MessageInputProps {
  client: any;
  user: any;  
}
export default function MessageInput({ client, user}: MessageInputProps) {
  const [message, setMessage] = useState(''); // Store the message input

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && client) {
      const newMessage = {
        user: user,
        comment: message,
        action:'NEW_MESSAGE',
        timestamp: new Date().toISOString(),
      };
      console.log("sending messing to /app/messageSimple");
      console.log('Sending message:', message);
      client.publish({
        destination: "/app/messageSimple",
        body: message
        });
      setMessage('');
    }

  };

  
  return (
    <form onSubmit={handleSubmit} className="message-input-form">
    <input
      type="text"
      placeholder="Type your message here..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="message-input"
    />
    <button type="submit" className="message-send-button">
      Send
    </button>
  </form>
);
}