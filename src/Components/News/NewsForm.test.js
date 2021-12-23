import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, waitFor } from "@testing-library/react";
import NewsForm from "./NewsForm";

test("render content",async () => {

  let component;

   await waitFor(() => {
     component = render(<NewsForm />)

  });

  // console.log("Componente: ", component.container.innerHTML);
  
  expect(component.container).toHaveTextContent("Categoría");

});
