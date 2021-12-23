import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";
import contactService from "../../Services/contactService";

const form = {
  name: "Juan",
  email: "test@gmail.com",
  phone: "123456789",
  message: "some lorem",
};

const mockFn = jest.fn();

describe("contact-form", () => {
  it("get the inputs via label", async () => {
    const { getByLabelText } = render(<ContactForm />);
    const nameInput = getByLabelText(/Nombre/i);
    const emailInput = getByLabelText(/E-mail/i);
    const phoneInput = getByLabelText(/Teléfono/i);
    const messageInput = getByLabelText(/Mensaje/i);

    await waitFor(() => {
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(phoneInput).toBeInTheDocument();
      expect(messageInput).toBeInTheDocument();
    });
  });

  it("trigger submit button without fill the inputs trigger a error message", async () => {
    const { getByText, getByRole } = render(<ContactForm />);
    userEvent.click(getByRole("button", { name: "Enviar Mensaje" }));
    await waitFor(() => {
      expect(
        getByText("Por favor ingresa un mensaje para continuar.")
      ).toBeInTheDocument();
    });
  });

  it("submit form after filled all fields", async () => {
    const { getByLabelText, getByRole } = render(
      <ContactForm onSubmit={mockFn} />
    );
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
      expect(mockFn).toBeCalled();
    });
  });

  // it("calls to the api via service", async () => {
  //   const { getByLabelText, getByRole } = render(
  //     <ContactForm onSubmit={contactService.create} />
  //   );
  //   const nameInput = getByLabelText(/Nombre/i);
  //   const emailInput = getByLabelText(/E-mail/i);
  //   const phoneInput = getByLabelText(/Teléfono/i);
  //   const messageInput = getByLabelText(/Mensaje/i);

  //   userEvent.type(nameInput, form.name);
  //   userEvent.type(emailInput, form.email);
  //   userEvent.type(phoneInput, form.phone);
  //   userEvent.type(messageInput, form.message);
  //   userEvent.click(getByRole("button", { name: "Enviar Mensaje" }));

  //   await waitFor(() => {

  //   })
  // })
});
