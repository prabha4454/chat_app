import React from 'react'
import { chatStateStore } from '../store/chatStateStore';
import toast from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const MessageInput = () => {

  const {selectedContact ,sendMessage} = chatStateStore()
  return (
    <>
    <Formik
                  initialValues={{
                    text: "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {

                    if(!values.text)
                    { 
                     console.log(values) 
                      return(toast.error("please enter some message")) }
                     
                     
                    

           
              sendMessage(values)
                      .then(({ data }) => {
                        
                        setSubmitting(false);
                        values=null
                      })
                      .catch((error) => {
                      toast.error(error.message)
                      console.log("Error sending message:",error)
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
    </>
  )
}
