import React from 'react'
import { chatStateStore } from '../store/chatStateStore'
import { authStateStore } from '../store/authStateStore'
import { format } from "date-fns";
import { useEffect } from 'react';
import { useRef } from 'react';
import { CiMenuKebab } from "react-icons/ci";


export const ChatsSpace = () => {
  const messageEndRef = useRef(null);
  const { messages, subscribeToMessage, unsubscribeToMessage } = chatStateStore();
  const { authUser } = authStateStore()
  useEffect(() => {
    subscribeToMessage()
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    return () => unsubscribeToMessage()
  }, [subscribeToMessage, unsubscribeToMessage, messages])
  return (
    <>
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat   ${message.senderId === authUser.user._id ? "chat-end " : "chat-start "}`}
        >

          <div
            className={`inline-block chat-bubble  ${message.senderId === authUser.user._id
              ? "bg-blue-600 text-white relative "
              : "bg-gray-800 text-gray-100"
              } rounded-xl`}
          >
            <div className={`${message.senderId === authUser.user._id ? " absolute left-0 " :"absolute right-0"} `}>
              <span className=' hover:cursor-pointer '><CiMenuKebab className='size-3.5 text-white'/>
              </span>
            </div>
            <div className={`${message.senderId === authUser.user._id ?"pl-1":"pr-1"}`}>  {message.text}
              <div
                className={`text-xs mt-1 ${message.senderId === authUser.user._id ? "text-blue-200" : "text-gray-400"
                  }`}
              >
                {format(message.createdAt, "hh:mm a")}
              </div></div>

          </div>
        </div>

      ))}
      <div ref={messageEndRef}>

      </div>
    </>
  )
}
