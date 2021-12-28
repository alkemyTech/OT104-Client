import React from "react";
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import userEvent from "@testing-library/user-event";

const form = {
  username: "alejoagustinaseijas@gmail.com",
  password: "fkv@2021",
};

describe("LoginForm", () => {
  const initialState = {
    auth: {
      isAuthenticated: false,
      token: null,
      user: null,
      status: "",
    },
  };
  const mockStore = configureStore();
  let store;

  it("get form imputs from label", () => {
    store = mockStore(initialState);
    const { getByLabelText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("submit button with empty imputs message alert", async () => {
    store = mockStore(initialState);
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    userEvent.click(getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(getByText("Enter your email")).toBeInTheDocument();
      expect(getByText("Enter your password")).toBeInTheDocument();
    });
  });

  it("submit when fields are completed", async () => {
    store = mockStore(initialState);
    const { getByRole, getByLabelText, findByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const usernameInput = getByLabelText(/Email/i);
    const passwordInput = getByLabelText(/Password/i);

    userEvent.type(usernameInput, form.username);
    userEvent.type(passwordInput, form.password);

    userEvent.click(getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(findByText(/bienvenidos/i));
    });
  });
});
