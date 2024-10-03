"use client";
import React, { useState } from 'react';
import './MessageInput.css';
import { FiSend } from 'react-icons/fi';
import { Client } from '@stomp/stompjs';

interface MessageInputProps {
  client: any;
  user: any;
}

export default function MessageInput({ client, user }: MessageInputProps) {
  const [message, setMessage] = useState(''); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && client) {
      console.log("Sending message to /app/messageSimple");
      console.log('Sending message:', message);

      try{
      client.publish({
        destination: "/app/messageSimple",
        body: message, // Send message as string
      });
    }catch(error){
      console.error("Error updating messages:", error);
    }

      setMessage(''); // Clear the input after sending
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      <input
        type="text"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="message-input"
      />
      <button type="submit" className="message-send-button">
        Send <FiSend />
      </button>
    </form>
  );
}