import React, { useState, useEffect } from "react";
/* import { useAuthStore } from "../store/authStateStore"; */
import { axiosInstance } from "../lib/axios.js";

import { authStateStore } from "../store/authStateStore.js";
import { chatStateStore } from "../store/chatStateStore.js";
import { ChatsSpace } from "../components/ChatsSpace.jsx";
import { MessageInput } from "../components/MessageInput.jsx";
import { Contacts } from "../components/Contacts.jsx";

export const Home = () => {
  /* const { user } = useAuthStore(); */
  const { fetchContacts , selectedContact ,rightStyle ,leftStyle,} = chatStateStore();

  const [chat, setChat] = useState("show");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  const { loggingOut,onlineUser } = authStateStore();

  useEffect(() => {
    fetchContacts();
  }, []);

 
  return (
    <div>
      <div className=" h-dvh flex bg-gray-900 text-gray-100 ">
        {/* Left Side for contacts  */}

        <div className={`w-full  h-full md:w-80 md:flex md:flex-col  lg:flex lg:flex-col ${leftStyle}  border-r border-gray-700`}>
        <Contacts />
        </div>

        {/*Right side for  Main Chat Area */}

        <div className={`flex-1  lg:flex flex-col ${rightStyle}  md:flex`}>
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-gray-700">
              <div className="flex  ">
                <div className=" rounded-full block my-auto mr-4">
                  {onlineUser.includes(selectedContact._id) ? (
                    <div className="relative size-13 rounded-full">
                      {selectedContact.pimg ? (
                        <img
                          src={selectedContact.pimg}
                          className="  rounded-full border-4 border-blue-500"
                          alt=""
                        />
                      ) : (
                        <img
                          src={`/images/defaultavatar.jpg`}
                          className="  border-2 rounded-full border-green-500"
                          alt=""
                        />
                      )}

                      {/* <div
                        className={
                          "absolute top-1 right-1 size-3 bg-green-700 rounded-full border-2 border-white"
                        }
                      ></div> */}
                    </div>
                  ) : (
                    <div className="avatar offline">
                      <div className="size-13 rounded-full">
                        {selectedContact.pimg ? (
                          <img
                            src={selectedContact.pimg}
                            className=" border-2 rounded-full border-gray-700 chat-image"
                            alt=""
                          />
                        ) : (
                          <img
                            src={`/images/defaultavatar.jpg`}
                            className=" border-2 rounded-full border-gray-700 chat-image"
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="block p-1">
                  <h3 className="font-medium  text-md">{selectedContact.fullName}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {onlineUser.includes(selectedContact._id) ? "online" : "offline"}
                  </p>
                </div>
                </div>
              </div>

              {/* to show the chat history */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <ChatsSpace />
              </div>

              {/* for message sending input section */}
              <div className="p-4 border-t border-gray-700">
                <MessageInput />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
