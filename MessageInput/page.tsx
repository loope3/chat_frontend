
"use client";
import React from 'react';
import './MessageInput.css';
import './User1Layout.css';
import './UserPage.css';
import { FiSend } from 'react-icons/fi';
import Link from 'next/link'
 let circle = "";
let UName = "";

export default function MessageInput() {
function load()
{

  let result = localStorage.getItem("UserName");

  {
     UName = localStorage.getItem("UName");
  }
  localStorage.clear();
              console.log("Data: "+result);

                  if(result == "true")
                  {
                      circle = "green";
                  }
                  else if(result == "false")
                  {
                      circle = "red";
                  }
}

function test(str)
{
    console.log("Print: "+str);
}
  return (

    <div className="message-input-container">
      <input
        type="text"
        className="message-input"
        placeholder="Type your message..."
      />
        <div id="container">
        <input type="text" placeholder={UName} />
        <div id="Online" style={{backgroundColor:circle}}>

        </div>
        </div>
      <button onLoad={load()} onClick={test} className="send-button" >
              <FiSend size={20} /> {/* Include the send icon */}
            </button>
       <Link  className="BTN_HOME" href="//"> <button>HomePage    </button></Link>
              <Link  className="BTN_HOME" href="/UserPage/"> <button>User Page   </button></Link>

    </div>
  );
}

