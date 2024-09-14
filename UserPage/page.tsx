'use client'
import React from 'react';
import './User1Layout.css';
import './UserPage.css';
import ChatHistory from './ChatHistory';
import Link from 'next/link'
export default function UserLayout() {
let User = false;
function GetText(event)
{
    console.log("Got text");
    console.log("Text: "+event);
    document.getElementById("side1").innerHTML = event;
    localStorage.setItem("UName",event);
    User = true;
}
function MessagePage()
{
    if(User == true)
    {
        localStorage.setItem("UserName","true");
    }
    else if(User == false)
    {
        localStorage.setItem("UserName","false");
    }


    console.log("Value of UserName: "+User);
}
  return (

    <div className="user-layout">
      <div className="user-left">
        <p id="side1">User 1</p>
      </div>
      <div className="chat-container">
        <div>
        <Link className="Message" onClick={MessagePage} href={'/MessageInput/'}> Message Input  </Link>
        <Link className="Message" href={'//'}> Home  </Link>
         <input type="text" id="txtBox"  placeholder = "Enter UserName" className="UrName1"/>
         <button className="UrName" onClick={() => GetText(document.getElementById("txtBox").value)}>Submit</button>
        </div>
      </div>
      <div className="user-right">
        <p>User 2</p>
      </div>
    </div>
  );
}