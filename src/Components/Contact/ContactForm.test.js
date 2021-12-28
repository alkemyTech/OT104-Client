import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";
import contactService from "../../Services/contactService";

const form = {
  name: "Juan",
  email: "test@gmail.com",
  phone: "123456789",
  message: "some lorem",
};

const contact = jest.spyOn(contactService, "create");

describe("contact-form", () => {
  it("trigger submit button without fill the inputs trigger a error message", async () => {
    render(<ContactForm />);
    userEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }));
    await waitFor(() => {
      expect(
        screen.getByText("Por favor ingresa un nombre para continuar.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Por favor ingresa un email para continuar.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Por favor ingresa un mensaje para continuar.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Por favor ingresa un teléfono para continuar.")
      ).toBeInTheDocument();
    });
  });

  it("submit form and get error from petition", async () => {
    contact.mockReturnValue(new Error());
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const messageInput = screen.getByLabelText(/Mensaje/i);

    userEvent.type(nameInput, form.name);
    userEvent.type(emailInput, form.email);
    userEvent.type(phoneInput, form.phone);
    userEvent.type(messageInput, form.message);
    userEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }));

    await waitFor(() => {
      expect(
        screen.getByText("Ocurrio un error al intentar realizar la petición")
      ).toBeInTheDocument();
    });
  });

  it("submit form and get error from api", async () => {
    contact.mockReturnValue({
      data: { success: false },
    });
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const messageInput = screen.getByLabelText(/Mensaje/i);

    userEvent.type(nameInput, form.name);
    userEvent.type(emailInput, form.email);
    userEvent.type(phoneInput, form.phone);
    userEvent.type(messageInput, form.message);
    userEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }));

    await waitFor(() => {
      expect(
        screen.getByText("Ocurrio un error al intentar guardar este contacto")
      ).toBeInTheDocument();
    });
  });

  it("success to save a new contact", async () => {
    contact.mockReturnValue({ data: { success: true } });
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Nombre/i);
    const emailInput = screen.getByLabelText(/E-mail/i);
    const phoneInput = screen.getByLabelText(/Teléfono/i);
    const messageInput = screen.getByLabelText(/Mensaje/i);

    userEvent.type(nameInput, form.name);
    userEvent.type(emailInput, form.email);
    userEvent.type(phoneInput, form.phone);
    userEvent.type(messageInput, form.message);
    userEvent.click(screen.getByRole("button", { name: "Enviar Mensaje" }));

    await waitFor(() => {
      expect(
        screen.getByText("Contacto guardado con exito")
      ).toBeInTheDocument();
    });
  });
});
