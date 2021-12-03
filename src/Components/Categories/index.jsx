import React from "react";
import { Table, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TrashFill, PencilFill } from "react-bootstrap-icons";

const mockCategories = [
  {
    id: 1172,
    name: "Visitas",
    description: "Visitas",
    image: null,
    parent_category_id: 1,
    created_at: "2021-11-21T14:02:42.000000Z",
    updated_at: "2021-11-25T02:20:51.000000Z",
    deleted_at: null,
    group_id: null,
  },
  {
    id: 1173,
    name: "categoria 7",
    description:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>",
    image: "http://ongapi.alkemy.org/storage/f9eFSqaj2F.jpeg",
    parent_category_id: 0,
    created_at: "2021-11-21T14:02:47.000000Z",
    updated_at: "2021-11-22T14:45:58.000000Z",
    deleted_at: null,
    group_id: null,
  },
  {
    id: 1255,
    name: "Titulo",
    description: "Testeando la api",
    image: null,
    parent_category_id: null,
    created_at: "2021-12-01T03:20:30.000000Z",
    updated_at: "2021-12-01T03:20:30.000000Z",
    deleted_at: null,
    group_id: null,
  },
  {
    id: 1205,
    name: "Manu",
    description: "Programando",
    image: "http://ongapi.alkemy.org/storage/RHuhR3aAbd.jpeg",
    parent_category_id: null,
    created_at: "2021-11-27T13:52:27.000000Z",
    updated_at: "2021-11-27T13:56:31.000000Z",
    deleted_at: null,
    group_id: null,
  },
];

//funtion to format the date to local time
const formatDate = (date) => {
  const dateFormatted = new Date(date);
  return dateFormatted.toLocaleDateString();
};

export default function Categories() {
  return (
    <Container
      style={{ maxWidth: "30rem" }}
      className="d-flex flex-column text-center"
    >
      <h1>Categorias</h1>
      <div className="mx-auto">
        <Link to="backoffice/categories/create" className="btn btn-success m-2">
          Crear
        </Link>
      </div>
      <Table striped bordered hover className="align-middle">
        <thead>
          <tr>
            <th>Nombre:</th>
            <th>Creada:</th>
            <th>Acciones:</th>
          </tr>
        </thead>
        <tbody>
          {mockCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{formatDate(category.created_at)}</td>
              <td className="d-flex justify-content-around">
                <button className="btn btn-outline-danger" title="Eliminar">
                  <TrashFill />
                </button>

                <button className="btn btn-outline-primary" title="Editar">
                  <PencilFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
