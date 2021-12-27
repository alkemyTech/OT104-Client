import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MembersForm from "./MembersForm";

const dataForm = {
  name: "test",
  description: "<p>test</p>",
  facebook: "https://www.facebook.com/test/",
  instagram: "https://www.instagram.com/test/",
  linkedin: "https://www.linkedin.com/in/test/",
  image:
    "data:image/jpeg;base64,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",
};

// test("Render title component", () => {
//   render(<MembersForm />);
//   const title = screen.getByText("Member registration");
//   expect(title).toBeInTheDocument();
// });

// test("Send form without information", async () => {
//   const { getByText } = render(<MembersForm />);

//   const button = screen.getByRole("button", { name: /send/i });
//   userEvent.click(button);
//   await waitFor(() => {
//     expect(getByText("You have to provide a name.")).toBeInTheDocument();
//     expect(getByText("You have to provide an image.")).toBeInTheDocument();
//     expect(
//       getByText("Please, provide a facebook website for your social media.")
//     ).toBeInTheDocument();
//     expect(
//       getByText("Please, provide a instagram website for your social media.")
//     ).toBeInTheDocument();
//     expect(
//       getByText("Please, provide a linkedin website for your social media.")
//     ).toBeInTheDocument();
//   });
// });

// test("Send data & get error ", async () => {
//   /**
//    * For this test comment the Ckeditor & yup component of this
//    */
//   const { getByPlaceholderText, container, findByText, getByRole } = render(
//     <MembersForm />
//   );

//   const nameInput = getByPlaceholderText("Name");
//   const fileInput = container.querySelector("#sandbox > input");
//   const fbInput = getByPlaceholderText("Facebook profile");
//   const igInput = getByPlaceholderText("Instagram profile");
//   const linkInput = getByPlaceholderText("Linkedin profile");

//   userEvent.type(nameInput, dataForm.name);
//   userEvent.type(fileInput, dataForm.image);
//   userEvent.type(fbInput, dataForm.facebook);
//   userEvent.type(igInput, dataForm.instagram);
//   userEvent.type(linkInput, dataForm.linkedin);

//   userEvent.click(getByRole("button", { name: /send/i }));
//   await waitFor(() => {
//     expect(findByText(/error to post/i));
//   });
// });

// test("Send & ok process", async () => {
//   //   /**
//   //    * For this test comment the Ckeditor & yup component of this.
//   //    */

//   const { getByPlaceholderText, container, findByText, getByRole } = render(
//     <MembersForm />
//   );

//   const nameInput = getByPlaceholderText("Name");
//   const fileInput = container.querySelector("#sandbox > input");
//   const fbInput = getByPlaceholderText("Facebook profile");
//   const igInput = getByPlaceholderText("Instagram profile");
//   const linkInput = getByPlaceholderText("Linkedin profile");

//   userEvent.type(nameInput, dataForm.name);
//   userEvent.type(fileInput, dataForm.image);
//   userEvent.type(fbInput, dataForm.facebook);
//   userEvent.type(igInput, dataForm.instagram);
//   userEvent.type(linkInput, dataForm.linkedin);

//   userEvent.click(getByRole("button", { name: /send/i }));

//   await waitFor(() => {
//     expect(findByText(/Miembro creado correctamente/i));
//   });
// });
