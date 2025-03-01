import React from "react";
import toast from "react-hot-toast";
import { profileStateStore } from "../store/profileStateStore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const AddPic = () => {
  const { editProfilePic } = profileStateStore();
  const validationSchema = Yup.object({
    profilePic: Yup.mixed().required("A file is required"),
  });

  return (
    <>
      <dialog id="edit-profile-pic" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-5 p-1">
            <Formik
              initialValues={{
                profilePic: null,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const formData = new FormData();
                formData.append("profilePic", values.profilePic);

                try {
                  await editProfilePic(formData);
                  setSubmitting(false);
                  resetForm();
                  toast.success("Profile picture updated successfully");
                } catch (error) {
                  toast.error(error.message);
                  console.log("Error sending message:", error);
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="flex space-x-4">
                    <Field
                      name="profilePic"
                      type="file"
                      className="file-input mx-auto file-input-bordered file-input-info w-full max-w-xs"
                      onChange={(event) => {
                        if (event.currentTarget.files[0]) {
                          setFieldValue("profilePic", event.currentTarget.files[0]);
                        }
                      }}
                    />
                    <ErrorMessage
                      name="profilePic"
                      component="div"
                      className="text-error"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-info mt-5 flex justify-self-end rounded-md"
                    disabled={isSubmitting}
                  >
                    Done
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </dialog>
    </>
  );
};
