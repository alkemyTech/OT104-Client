import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
function LoginForm() {
  const logInAuth = async (data) => {
    await axios
      .post("http://ongapi.alkemy.org/api/login", {
        email: data.emailUser,
        password: data.passwordUser,
      })
      .then((response) => {
        localStorage.setItem(
          "sessionToken",
          JSON.stringify(response.data.data)
        );
      })
      .catch((err) => {
        alert("Error" + err);
      });
  };

  return (
    <Formik
      initialValues={{
        emailUser: "",
        passwordUser: "",
      }}
      validate={(data) => {
        let err = {};
        if (!data.emailUser) {
          err.emailUser = "Enter your email";
        } else if (
          !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
            data.emailUser
          )
        ) {
          err.emailUser = "Invalid email";
        }

        if (!data.passwordUser) {
          err.passwordUser = "Enter your password";
        } else if (
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
            data.passwordUser
          )
        ) {
          err.passwordUser = "Invalid password";
        }

        return err;
      }}
      onSubmit={(data, { resetForm }) => {
        resetForm();
        logInAuth(data);
      }}
    >
      {({ errors }) => (
        <Form className="form-container">
          <label className="form-label">Email</label>
          <Field
            type="text"
            className="input-field "
            id="username"
            name="emailUser"
            placeholder="Enter email"
          />
          <ErrorMessage
            name="emailUser"
            component={() => <div className="error"> {errors.emailUser} </div>}
          />

          <label className="form-label">Password</label>
          <Field
            type="password"
            className="input-field "
            id="password"
            name="passwordUser"
            placeholder="Enter password"
          />
          <ErrorMessage
            name="passwordUser"
            component={() => (
              <div className="error"> {errors.passwordUser} </div>
            )}
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
