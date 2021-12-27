import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../features/auth/authReducer";
import axios from "axios";
import { useHistory } from "react-router";
import { alertServiceConfirm } from "../Alert/AlertService";

function LoginForm() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const dispatch = useDispatch();
  const logInAuth = async (data) => {
    dispatch(login({ email: data.emailUser, password: data.passwordUser }));
  };

  useEffect(() => {
    if (isAuth) {
      alertServiceConfirm("Exito");
      history.push("/");
    }
  }, [isAuth]);

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
          <label htmlFor="username" className="form-label">
            Email
          </label>
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

          <label htmlFor="password" className="form-label">
            Password
          </label>
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
