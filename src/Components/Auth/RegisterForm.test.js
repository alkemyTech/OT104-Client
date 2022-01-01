import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "./RegisterForm";
import store from "../../app/store";
import { Provider } from "react-redux";
import axios from "axios";

const fakeData = {
  name: "Edgar",
  lastName: "Gonzalez",
  email: "test@gmail.com",
  password: "123456789",
  consfirmPassword: "123456789",
};

const nameFields = [
  "Nombre",
  "Apellido",
  "Correo",
  "Contraseña",
  "Confirme su contraseña",
];
const messages = [
  "Por favor ingrese un nombre",
  "Por favor ingrese un apellido",
  "Por favor ingrese un email",
  "Por favor ingrese una contraseña",
  "Por favor confirme tu contraseña",
];

describe("Register Form", () => {
  test("fullfill input shoud not get and error message", () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );
    screen.debug();
    nameFields.forEach((inputName, index) => {
      fireEvent.change(screen.getByRole("textbox", { name: inputName }), {
        target: { value: fakeData[index] },
      });
      expect(screen.queryByText(messages[index])).toBeNull();
    });
  });

  test("All empty fields shoud get an error message and the btn 'Registrame' to be disabled", async () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );
    nameFields.forEach((inputName, index) => {
      screen.getByRole("textbox", { name: inputName }).focus();
      screen.getByRole("textbox", { name: inputName }).blur();
    });

    expect(await screen.findByText(messages[0])).toBeInTheDocument();
    expect(await screen.findByText(messages[1])).toBeInTheDocument();
    expect(await screen.findByText(messages[2])).toBeInTheDocument();
    expect(await screen.findByText(messages[3])).toBeInTheDocument();
    expect(await screen.findByText(messages[4])).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Registrarme" })).toBeDisabled();
    screen.debug();
  });

  test("fullfill inputs enable the 'Registrarme' button", async () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );
    screen.debug();
    nameFields.forEach((inputName, index) => {
      fireEvent.change(screen.getByRole("textbox", { name: inputName }), {
        target: { value: fakeData[index] },
      });
    });
    expect(
      await screen.findByRole("button", { name: "Registrarme" })
    ).not.toBeDisabled();
    screen.debug();
  });
});
