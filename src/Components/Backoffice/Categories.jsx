import React, { useState, useEffect } from "react";
import { Table, Container, Breadcrumb, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import ConfirmModal from "./ConfirmModal";
import categoryService from "../../Services/CategoriesService";
// import { useDispatch, useSelector } from "react-redux";

//format the date to local time
const formatDate = (date) => {
  const dateFormatted = new Date(date);
  return dateFormatted.toLocaleDateString();
};

export default function Categories() {
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  // fetch categories from api
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryService.getAll();
      setCategories(res.data.data);
    };
    fetchCategories();
  }, []);

  const onDelete = (category) => {
    setModalData({
      name: category.name,
      onConfirm: () => {
        setShowModal(false);
        alert(`${category.name} borrado con exito.`);
      },
      onCancel: () => {
        setShowModal(false);
      },
    });
    setShowModal(true);
  };

  const onEdit = (category) => {
    alert(`Editando ${category.name}`);
  };

  return (
    <Container className="d-flex flex-column">
      <ConfirmModal showModal={showModal} data={modalData} />
      <div className="row">
        <div className="col">
          <Breadcrumb className="mt-3">
            <Link className="breadcrumb-item" to="/backoffice">
              Backoffice
            </Link>
            <Breadcrumb.Item active>Categories</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Listado de categorias</h1>
          <Button as={Link} to="/backoffice/categories/create" className="mb-3">
            Nueva categoria
          </Button>
        </div>

        <Table striped bordered hover className="align-middle">
          <thead>
            <tr>
              <th>Nombre:</th>
              <th>Creada:</th>
              <th className="text-center">Acciones:</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id.toString()}>
                <td>{category.name}</td>
                <td>{formatDate(category.created_at)}</td>
                <td className="d-flex justify-content-center gap-1">
                  <button
                    className="btn btn-outline-danger"
                    title="Eliminar"
                    onClick={() => onDelete(category)}
                  >
                    <TrashFill />
                  </button>

                  <button
                    className="btn btn-outline-primary"
                    title="Editar"
                    onClick={() => onEdit(category)}
                  >
                    <PencilFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
