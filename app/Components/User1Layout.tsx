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


const [messages, setMessages] = useState<string[]>([]);
const [activeUsers, setActiveUsers] = useState<{ username: string }[]>([]);

const [stompClient, setStompClient] = useState(null);


const userUrl = "/topic/users";
const topicUrl = "/topic/messages";
const topicSimpleMessage = "/topic/messageSimple";
const privateTopicUrl = "/topic/privatemessages";
const privatePreUrl = "/user/";
const appUsers = "/app/user";
const appMessages = "/app/message";
const appSimpleMessage = "/app/messageSimple";
const appPrivateMessages = "/app/privatemessage"
    
    const simpleMessageRecieved = (payload) => {
 	console.log("received a simple message!");
        console.log(payload.body);
        var payloadData = payload.body;
        setMessages((prevMessages) => [...prevMessages, payload.body]);
        console.log(messages);
    }

useEffect(() => {
    console.log(User.id);
    console.log("connecting to server...");
    const client = new Client({
	   brokerURL: "ws://localhost:8080/chatApp",
	   onConnect: () => {
	   
	       console.log("Connection succesful!");
         
        // current temp list of users ot display
        setActiveUsers([
          { username: "User1" },
          { username: "User2" },
          { username: "User3" }
        ]);
	       
	       client.subscribe(privatePreUrl + User.id + userUrl, (userList) => {
		   //add function to load HTML users from here

		   console.log(JSON.parse(userList.body));
		   });
		   
	       client.subscribe(topicUrl, (message) => {
		   console.log("received a complete message object!");
		   console.log(JSON.parse(message.body));
		   });
		   
	       client.subscribe(topicSimpleMessage, simpleMessageRecieved);
	       
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

    client.activate();
        
    setStompClient(client);
    
    return () => {
      if (client) {
        client.deactivate();
      }
    };
    
    },
[]);

  return (
    <div className="user-layout">
      <div className="chat-container">
        <div className='message-history-container'>
          <ChatHistory messages={messages} /> {/* Pass the state to ChatHistory */}
        </div> 
        <div className='message-input-container'>
          <MessageInput client={stompClient} user={User} />
        </div>       
      </div>
      <div className="current-users">
        <div className='user-name-and-activity'>
          <p>You!</p>
        </div>
        <hr className="divider" />
        <div className='list-active-users'>
          {activeUsers.map((user, index) => (
            <p key={index}>{user.username || `User ${index + 1}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

