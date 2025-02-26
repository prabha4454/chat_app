import React from 'react'
import { chatStateStore } from '../store/chatStateStore'
import { authStateStore } from '../store/authStateStore'
import { format } from "date-fns";

export const ChatsSpace = () => {
  const {messages} = chatStateStore();
  const {authUser} = authStateStore()
  return (
    <>
     {messages.map((message) => (
                      <div
                        key={message._id}
                        className={ `chat  ${message.senderId===authUser.user._id ?  "chat-end" : "chat-start"}` }
                      >
                        <div
                          className={`inline-block chat-bubble ${
                            message.senderId === authUser.user._id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-800 text-gray-100"
                          } rounded-xl`}
                        >
                          {message.text}
                          <div
                            className={`text-xs mt-1 ${
                              message.senderId === authUser._id ? "text-blue-200" : "text-gray-400"
                            }`}
                          >
                            {format(message.createdAt, "hh:mm a")}
                          </div>
                        </div>
                      </div>
                    ))}
                    </>
  )
}
