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
  const { fetchContacts , selectedContact ,rightStyle ,leftStyle} = chatStateStore();


  const [chat, setChat] = useState("show");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  const { loggingOut } = authStateStore();

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
                <h2 className="text-xl font-semibold">
                  {selectedContact.fullName}
                </h2>
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
