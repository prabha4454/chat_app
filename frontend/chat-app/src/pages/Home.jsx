import React, { useState, useEffect } from "react";
/* import { useAuthStore } from "../store/authStateStore"; */
import { axiosInstance } from "../lib/axios.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { format } from 'date-fns';
import { authStateStore } from "../store/authStateStore.js";

export const Home = () => {
  /* const { user } = useAuthStore(); */
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [chat, setChat] = useState("show");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  const {loggingOut} = authStateStore()
  

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userRes = await axiosInstance.get("/message/users");
        setContacts(userRes.data);

        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const fecthMessages = async(contact)=>{
    try{
      setSelectedContact(contact)
      const res = await axiosInstance.get(`/message/${contact._id}`);
      setMessages(res.data);
      console.log(contact._id)
      console.log(res.data)
      setResponse(res.data.message);
      }catch(err){
        setError(err.message);
      }
  }

  const chatToogle = () => {
    setActiveTab("chat");
    setChat(() => (chat === "show" ? "hide" : "show"));
  };

  return (
    <div>
      <div className="h-screen bg-gray-900 text-gray-100 flex">
        {/* Left Sidebar */}
        <div className="flex flex-col-reverse md:flex-row lg:flex-row  ">
          <div className="p-1 border-r   border-gray-700   ">
            <nav className={`flex lg:flex-col md:flex-col flex-row `}>
              <button
                onClick={chatToogle}
                className={`p-2 rounded-lg ${
                  activeTab === "chat" ? "bg-gray-800" : ""
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`p-2 rounded-lg ${
                  activeTab === "settings" ? "bg-gray-800" : ""
                }`}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button 
              className="btn btn-circle"
              onClick={loggingOut} >out</button>
            </nav>
          </div>

          <div
            className={
              chat === "hide"
                ? "hidden"
                : "w-full md:w-80  flex flex-col border-r border-gray-700"
            }
          >
            {/* Navigation */}
            <div className=" border-b border-gray-700 p-3 font-bold">CHAT</div>

            {/* Contacts List */}
            <div className="flex-1  overflow-y-auto p-4">
              {loading ? (
                <div className="p-4 text-center text-gray-400">
                  Loading contacts...
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">{error}</div>
              ) : contacts.length > 0 ? (
                contacts.map((contact) => (
                  <div
                    key={contact._id}
                    onClick={()=>fecthMessages(contact)}
                    className={`p-4 border-b  rounded-lg   mb-3 outline-md h-20 border-gray-700 hover:bg-gray-800 cursor-pointer ${
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
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 lg:flex flex-col hidden md:flex">
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">
                  {selectedContact.fullName}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={message.isSender ? "text-right" : "text-left"}
                  >
                    <div
                      className={`inline-block ${
                        message.senderId
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-gray-100"
                      } p-3 rounded-lg max-w-xs lg:max-w-md`}
                    >
                      {message.text}
                      <div
                        className={`text-xs mt-1 ${
                          message.senderId ? "text-blue-200" : "text-gray-400"
                        }`}
                      >
                        {format(message.createdAt,"hh:mm a")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-700">
                <Formik
                  initialValues={{
                    text: "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    console.log(selectedContact._id)
                    axiosInstance
                      .post(`/message/send/${selectedContact._id}`, values)
                      .then(({ data }) => {
                        setResponse({ message: data.message, isError: false });
                        setSubmitting(false);
                      })
                      .catch((error) => {
                        setResponse({
                          message:
                            error.response?.data?.message ||
                            "An error occurred",
                          isError: true,
                        });
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="flex space-x-4">
                        <Field
                          name="text"
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                          disabled={isSubmitting}
                        >
                          Send
                        </button>
                      </div>
                    </Form>
                  )}
                  
                </Formik>
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
