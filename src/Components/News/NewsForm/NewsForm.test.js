import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Router from "react-router-dom";
import newsService from "./../../../Services/novedadesService";
import categoriesService from "./../../../Services/categoriesService";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsForm from ".";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useHistory: () => ({
    goBack: jest.fn(),
  }),
}));

const mockData = {
  id: 666,
  name: "Montañistas",
  slug: null,
  content:
    "Montañistas nos visitan para una nueva expecienda de montaña en la montaña",
  image: "http://ongapi.alkemy.org/storage/BDiAYcWIBU.jpeg",
  user_id: null,
  category_id: "1402",
  created_at: "2021-12-23T21:08:13.000000Z",
  updated_at: "2021-12-23T21:08:13.000000Z",
  deleted_at: null,
};

const getNews = jest.spyOn(newsService, "getDetail");
const getCategories = jest.spyOn(categoriesService, "getAll");

beforeEach(() => {
  getCategories.mockReturnValue({
    data: {
      data: [
        {
          id: 1402,
          name: "Partners",
          description: "Testing redux",
          image: "http://ongapi.alkemy.org/storage/9TAHHq64hc.png",
          parent_category_id: null,
          created_at: "2021-12-27T21:29:37.000000Z",
          updated_at: "2021-12-28T19:49:49.000000Z",
          deleted_at: null,
          group_id: null,
        },
      ],
    },
  });

  localStorage.setItem(
    "token",
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9vbmdhcGkuYWxrZW15Lm9yZ1wvYXBpXC9sb2dpbiIsImlhdCI6MTY0MDIwMTkyOSwiZXhwIjoxNjQwMjA1NTI5LCJuYmYiOjE2NDAyMDE5MjksImp0aSI6InB2Q052aUxRQUFMdVhWcEoiLCJzdWIiOjExNjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.EOXvZwy3JZZ1wciFnxC4f4F7iLdqJIG7vGMV--s9rVc"
  );
});

test("Render content when is creating a new", async () => {
  jest.spyOn(Router, "useParams").mockReturnValue({ id: undefined });
  await waitFor(() => {
    render(<NewsForm />);
  });
  expect(await screen.findByText("Título")).toBeInTheDocument();
  expect(await screen.findByText("Imagen")).toBeInTheDocument();
  expect(await screen.findByText("Contenido")).toBeInTheDocument();
  expect(await screen.findByText("Categoría")).toBeInTheDocument();
});

test("Fields must be valitated", async () => {
  jest.spyOn(Router, "useParams").mockReturnValue({ id: undefined });

  await waitFor(() => {
    render(<NewsForm />);
  });
  userEvent.click(await screen.findByText("Enviar"));
  expect(await screen.findByText("El titulo es requerido")).toBeInTheDocument();
  expect(await screen.findByText("La imagen es requerida")).toBeInTheDocument();
  expect(
    await screen.findByText("El contenido es requerido")
  ).toBeInTheDocument();
  expect(
    await screen.findByText("La categoría es requerida")
  ).toBeInTheDocument();
});

test("Render content when is editing a new", async () => {
  getNews.mockResolvedValue({
    data: {
      data: mockData,
    },
  });
  jest.spyOn(Router, "useParams").mockReturnValue({ id: 666 });
  await waitFor(() => {
    render(<NewsForm />);
  });
  expect(await screen.findByText("Título")).toBeInTheDocument();
  expect(await screen.findByText("Imagen")).toBeInTheDocument();
  expect(await screen.findByText("Contenido")).toBeInTheDocument();
  expect(await screen.findByText("Categoría")).toBeInTheDocument();
  expect(await screen.findByTestId("title-element")).toHaveValue(mockData.name);
  expect(await screen.findByRole("img")).toHaveAttribute("src", mockData.image);
  expect(await screen.findByText(mockData.content)).toBeInTheDocument();
  expect(await screen.findByTestId("category-element")).toHaveValue(
    mockData.category_id
  );
});

test("should allow submit if form not completed", async () => {
  getNews.mockResolvedValue({
    data: {
      data: mockData,
    },
  });
  jest.spyOn(Router, "useParams").mockReturnValue({ id: 666 });
  await waitFor(() => {
    render(<NewsForm />);
  });  
  userEvent.click(await screen.findByText("Enviar"));

});

test("should not allow submit if the form was not completed", async () => {
  getNews.mockResolvedValue({
    data: {
      data: mockData,
    },
  });
  jest.spyOn(Router, "useParams").mockReturnValue({ id: 666 });
  await waitFor(() => {
    render(<NewsForm />);
  });
  const title = await screen.findByTestId("title-element");
  userEvent.clear(title);
  userEvent.click(await screen.findByText("Enviar"));
  expect(await screen.findByText("El titulo es requerido")).toBeInTheDocument();
});
