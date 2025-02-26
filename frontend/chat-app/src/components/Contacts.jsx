import React from "react";
import { chatStateStore } from "../store/chatStateStore";
import { authStateStore } from "../store/authStateStore";

export const Contacts = () => {
  const { contacts, Error, isLoadingContacts, selectedContact, fecthMessages } =
    chatStateStore();
  const { onlineUser } = authStateStore();

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
              onClick={() => fecthMessages(contact)}
              className={`p-4 border-b  rounded-lg   mb-3 outline-md h-20 border-gray-700  hover:bg-gray-800 cursor-pointer ${
                selectedContact?._id === contact._id ? "bg-gray-800 " : ""
              }`}
            >
              <div className="flex  ">
                <div className=" rounded-full block my-auto mr-4">
                  {onlineUser.includes(contact._id) ? (
                    <div className="relative size-13 rounded-full">
                      {contact.pimg ? (
                        <img
                          src={contact.pimg}
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

                      <div
                        className={
                          "absolute top-1 right-1 size-3 bg-green-700 rounded-full border-2 border-white"
                        }
                      ></div>
                    </div>
                  ) : (
                    <div className="avatar offline">
                      <div className="size-13 rounded-full">
                        {contact.pimg ? (
                          <img
                            src={contact.pimg}
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
                  <h3 className="font-medium  text-md">{contact.fullName}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {onlineUser.includes(contact._id) ? "online" : "offline"}
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
