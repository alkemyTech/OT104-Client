import React from "react";
import { NavLink as Link, useRouteMatch } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";

const backofficeRoutes = [
  {
    name: "Home",
    icon: "bi bi-house-door",
    path: "/",
  },
  {
    name: "Actividades",
    icon: "bi bi-activity",
    path: "/backoffice/activities",
  },
  {
    name: "Categorias",
    icon: "bi bi-tag",
    path: "/backoffice/categories",
  },
  {
    name: "Miembros",
    icon: "bi bi-person-square",
    path: "/backoffice/members",
  },
  {
    name: "Novedades",
    icon: "bi bi-newspaper",
    path: "/backoffice/news",
  },
  {
    name: "Organización",
    icon: "bi bi-building",
    path: "/backoffice/organization",
  },
  {
    name: "Slides",
    icon: "bi bi-aspect-ratio",
    path: "/backoffice/slides",
  },
  {
    name: "Usuarios",
    icon: "bi bi-person-circle",
    path: "/backoffice/users",
  },
];

export default function Sidebar({show, openSidebar}) {
  const location = useRouteMatch("/backoffice");

  if (location === null) return null;

  return (
    <>
      <Offcanvas show={show} onHide={openSidebar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link to="/backoffice" className="btn btn-outline-primary">
              Backoffice
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column mb-auto list-group">
            {backofficeRoutes.map((route) => (
              <li key={route.name}>
                <Link
                  exact
                  activeClassName="active"
                  to={route.path}
                  onClick={openSidebar}
                  className="list-group-item list-group-item-action border-0"
                >
                  <i className={route.icon}></i> {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
