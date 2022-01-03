import React from "react";
import Card from "../Card/Card";
import { Container, Row } from "react-bootstrap";
//import "./styles/newness.css";

let dat = [
  {
    id: 1231,
    name: "Apoyo escolar",
    slug: null,
    content:
      "<p>Este año hemos abierto aulas de apoyo escolar primario para todos los niños hasta los 12 años.</p>",
    image: "http://ongapi.alkemy.org/storage/gGrvMkykLf.jpeg",
    user_id: null,
    category_id: 1454,
    created_at: "2022-01-03T16:21:43.000000Z",
    updated_at: "2022-01-03T16:21:43.000000Z",
    deleted_at: null,
  },
  {
    id: 1231,
    name: "Apoyo escolar",
    slug: null,
    content:
      "<p>Este año hemos abierto aulas de apoyo escolar primario para todos los niños hasta los 12 años.</p>",
    image: "http://ongapi.alkemy.org/storage/gGrvMkykLf.jpeg",
    user_id: null,
    category_id: 1454,
    created_at: "2022-01-03T16:21:43.000000Z",
    updated_at: "2022-01-03T16:21:43.000000Z",
    deleted_at: null,
  },
  {
    id: 1231,
    name: "Apoyo escolar",
    slug: null,
    content:
      "<p>Este año hemos abierto aulas de apoyo escolar primario para todos los niños hasta los 12 años.</p>",
    image: "http://ongapi.alkemy.org/storage/gGrvMkykLf.jpeg",
    user_id: null,
    category_id: 1454,
    created_at: "2022-01-03T16:21:43.000000Z",
    updated_at: "2022-01-03T16:21:43.000000Z",
    deleted_at: null,
  },
];

function Newness() {
  return (
    <Container
      style={{ width: "auto" }}
      className="d-flex flex-wrap flex-row border border-dark mb-3 mt-3"
    >
      {dat.map((data) => {
        return (
          <Container className="m-1">
            <Card
              image={data.image}
              title={data.name}
              description={data.content}
            />
          </Container>
        );
      })}
    </Container>
  );
}
export default Newness;
