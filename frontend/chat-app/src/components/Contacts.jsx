import React from "react";
import { chatStateStore } from "../store/chatStateStore";

export const Contacts = () => {
  const { contacts, Error, isLoadingContacts, selectedContact, fecthMessages } =
    chatStateStore();

  return (
    <>
  
        <div className=" border-b  border-gray-700 p-3 font-bold ">
         <h2>CHAT</h2>
          </div>

        {/* Contacts List */}
        <div className="flex-1   overflow-y-auto p-4">
          {isLoadingContacts ? (
            <div className="p-4 text-center  text-gray-400">
              Loading contacts...
            </div>
          ) : Error ? (
            <div className="p-4 text-center  text-red-500">{Error}</div>
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact._id}
                onClick={()=>fecthMessages(contact)}
                className={`p-4 border-b  rounded-lg   mb-3 outline-md h-20 border-gray-700  hover:bg-gray-800 cursor-pointer ${
                  selectedContact?._id === contact._id ? "bg-gray-800 " : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{contact.fullName}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              {contacts.message}
            </div>
          )}
        </div>
      
    </>
  );
};
