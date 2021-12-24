import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

const form = {
  name: "Juan",
  email: "test@gmail.com",
  phone: "123456789",
  message: "some lorem",
};

const mockFn = jest.fn();

describe("contact-form", () => {
  it("trigger submit button without fill the inputs trigger a error message", async () => {
    const { getByText, getByRole } = render(<ContactForm />);
    userEvent.click(getByRole("button", { name: "Enviar Mensaje" }));
    await waitFor(() => {
      expect(
        getByText("Por favor ingresa un nombre para continuar.")
      ).toBeInTheDocument();
      expect(
        getByText("Por favor ingresa un email para continuar.")
      ).toBeInTheDocument();
      expect(
        getByText("Por favor ingresa un mensaje para continuar.")
      ).toBeInTheDocument();
      expect(
        getByText("Por favor ingresa un teléfono para continuar.")
      ).toBeInTheDocument();
    });
  });

  it("submit form and get errors", async () => {
    //You need to remove the .env for contactService
    const { getByLabelText, getByText, getByRole } = render(<ContactForm />);
    const nameInput = getByLabelText(/Nombre/i);
    const emailInput = getByLabelText(/E-mail/i);
    const phoneInput = getByLabelText(/Teléfono/i);
    const messageInput = getByLabelText(/Mensaje/i);

    userEvent.type(nameInput, form.name);
    userEvent.type(emailInput, form.email);
    userEvent.type(phoneInput, form.phone);
    userEvent.type(messageInput, form.message);
    userEvent.click(getByRole("button", { name: "Enviar Mensaje" }));

    await waitFor(() => {
      expect(getByText("Error")).toBeInTheDocument();
    });
  });

  it("calls to the api via service", async () => {
    const { getByLabelText, getByText, getByRole } = render(<ContactForm />);
    const nameInput = getByLabelText(/Nombre/i);
    const emailInput = getByLabelText(/E-mail/i);
    const phoneInput = getByLabelText(/Teléfono/i);
    const messageInput = getByLabelText(/Mensaje/i);

    userEvent.type(nameInput, form.name);
    userEvent.type(emailInput, form.email);
    userEvent.type(phoneInput, form.phone);
    userEvent.type(messageInput, form.message);
    userEvent.click(getByRole("button", { name: "Enviar Mensaje" }));

    await waitFor(() => {
      expect(getByText("Exito")).toBeInTheDocument();
    });
  });
});
