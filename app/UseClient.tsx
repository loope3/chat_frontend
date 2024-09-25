"use client"
import Image from "next/image";
import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


export default function Home() {
    const User = {
        id: uuidv4(),
        serialId: null,
        username: "anonymous"
    };

    const Message = {
        user: null,
        receiverId: null,
        comment: null,
        action: null,
        timestamp: null
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
               console.log(JSON.parse(message.body));
               });
           client.subscribe(topicSimpleMessage, (message) => {
               console.log(message);
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
      <div>
            <form id="formsendmessage">
                <div>
                    <label id="messagelabel" className="row" htmlFor="send">Send a public message:</label>
                    <input type="text" id="inputsendmessage" placeholder="Type your message here..."></input>
                    <button id="send" type="submit">Send</button>
                </div>
            </form>
      </div>
  );
}
