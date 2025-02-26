import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../lib/axios";
import React from 'react'
import { authStateStore } from '../store/authStateStore'

const Editprofile = () => {
    const {userProfile , editingProfileDetiail} = authStateStore();
  return (

    <>
    {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
<div className="mt-5 p-1">


    <Formik
            initialValues={{
              
              fullName: userProfile.user.fullName,
              
              bio: userProfile.user.bio,
              
            }}
           
            /* onSubmit={(values, { setSubmitting }) => {
            
              editingProfileDetiail(values)
                .then(({ data }) => {
                 
                  setSubmitting(false);
                })
                .catch((error) => {
                  
                  setSubmitting(false);
                });
            }} */
          >
            {({ isSubmitting }) => (
              <Form>
                
    
                <div className="mb-6">
                
                  <Field
                    type="text"
                    name="fullName"
                    id="email"
                    className="w-full px-3 py-2 border text-black  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your FullName"
                  />
                 
                </div>
    
                
    
                <div className="mb-6">
                <Field
                    component = "textarea"
                    name="bio"
                    id="bio"
                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring- focus:ring-blue-500"
                    placeholder="bio"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>
    
                {/* for navigat to sign up */}
               
    
                <button
                  type="submit"
                  className=" bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Done"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          </div>
    
  </div>
</dialog>
</>
  )
}

export default Editprofile
