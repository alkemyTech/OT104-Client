import  React from 'react';
import "@testing-library/jest-dom/extend-expect"
import {render} from "@testing-library/react"
import Header from "./Header"

describe("Header", () => {
  let isAuth = false;
  let userRole = 0;
  
  // links that always appear
  const links = [
    "Inicio",
    "Nosotros",
    "Actividades",
    "Novedades"
  ]
  // links that appear when user is logged in as admin
  const adminLinks = [
    "Backoffice", 
  ]
  //links that appear when user is not admin
  const regularLinks = [
    "Contribuir",
    "Contacto",
  ]
  // links that appear when user is not logged in
  const guestLinks = [
    "Iniciar Sesión",
    "Registrarse",
  ]
 
  test("it shows only public and guest links when user is not logged in", () => {
    const {getByText,container} = render(<Header isAuth={isAuth} />)
    links.forEach(link => {
      expect(getByText(link)).toBeInTheDocument()
    })
    guestLinks.forEach(link => {
      expect(getByText(link)).toBeInTheDocument()
    })
    regularLinks.forEach(link => {
      expect(getByText(link)).toBeInTheDocument()
    })
    adminLinks.forEach(link => {
      expect(container).not.toHaveTextContent(link)
    })
  })

  test("guest links not appear when user is logged", () => {
    isAuth = true;
    userRole = 2;
    const {getByText, container} = render(<Header isAuth={isAuth} userRole={userRole} />)
    links.forEach(link => {
      expect(getByText(link)).toBeInTheDocument()
    })
    regularLinks.forEach(link => {
      expect(getByText(link)).toBeInTheDocument()
    })
    guestLinks.forEach(link => {
      expect(container).not.toHaveTextContent(link)
    })
    adminLinks.forEach(link => {
      expect(container).not.toHaveTextContent(link)
    })
  })

  test("backoffice link appear when admin user is logged in", () => {
    isAuth = true;
    userRole = 1;
    const {getByText, container} = render(<Header isAuth={isAuth} userRole={userRole} />)
    links.forEach(link => {
      expect(getByText(link)).toBeInTheDocument()
    })
    adminLinks.forEach(link => {
      expect(getByText(link)).toBeInTheDocument()
    })
    regularLinks.forEach(link => {
      expect(container).not.toHaveTextContent(link)
    })
    guestLinks.forEach(link => {
      expect(container).not.toHaveTextContent(link)
    })
  })

})
