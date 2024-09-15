"use client";
import React, { useEffect, useState } from 'react';
import './User1Layout.css';
import ChatHistory from './ChatHistory'; 
import MessageInput from './MessageInput'; 
import { Client } from '@stomp/stompjs'; 
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export default function UserLayout() {

  const User = {
    id: uuidv4(),
    serialId: null,
    username: "anonymous"
};

const [messages, setMessages] = useState([]);

const newMessage = {
  user: User,
  receiverId: null, 
  comment: messages,
  action: 'NEW_MESSAGE', 
  timestamp: new Date().toISOString(),
};


const userUrl = "/topic/users";
const topicUrl = "/topic/messages";
const topicSimpleMessage = "/topic/messageSimple";
const privateTopicUrl = "/topic/privatemessages";
const privatePreUrl = "/user/";
const appUsers = "/app/user";
const appMessages = "/app/message";
const appSimpleMessage = "/app/messageSimple";
const appPrivateMessages = "/app/privatemessage"

const client = new Client({
    brokerURL: "ws://localhost:8080/chatApp",
   onConnect: () => {
       console.log("Connection succesful!");
       client.subscribe(privatePreUrl + User.id + userUrl, (userList) => {
           //add function to load HTML users from here
           console.log(JSON.parse(userList.body));
           });
       client.subscribe(topicUrl, (message) => {
           console.log("received a complete message object!");
           console.log(JSON.parse(message.body));
           });
       client.subscribe(topicSimpleMessage, (message) => {
           console.log("received a simple message!");
           console.log(message);
           console.log(message.toString());
           console.log(message.body)
           });
       client.subscribe(privatePreUrl + User.id + privateTopicUrl, (message) => {
           console.log(JSON.parse(message.body));
           });
       client.publish({
           destination: appUsers,
           body: JSON.stringify(User)
           });
       },
    });

client.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

client.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

useEffect(() => {
    console.log(User.id);
    console.log("connecting to server...")
    client.activate();
    },
[]);

  return (
    <div className="user-layout">
      <div className="user-left">
        <p>User 1</p>
      </div>
      <div className="chat-container">
        {client && <MessageInput client={client} user={User}/>}
        <ChatHistory messages={messages}/>
      </div>
      <div className="user-right">
        <p>User 2</p>
      </div>
    </div>
  );
}