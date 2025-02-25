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
                        className={message.senderId===authUser._id ? "text-right" : "text-left"}
                      >
                        <div
                          className={`inline-block ${
                            message.senderId === authUser._id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-800 text-gray-100"
                          } p-3 rounded-lg max-w-xs lg:max-w-md`}
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
