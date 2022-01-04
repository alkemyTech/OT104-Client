import React, { useState, useEffect } from "react";
import { Table, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TrashFill, PencilFill } from "react-bootstrap-icons";
import ConfirmModal from "../Categories/ConfirmModal";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSlice";

//format the date to local time
const formatDate = (date) => {
  const dateFormatted = new Date(date);
  return dateFormatted.toLocaleDateString();
};

export default function Categories() {
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  // fetch categories from api
  useEffect(() => {
    dispatch(getCategories());
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
    <Container fluid>
      <ConfirmModal showModal={showModal} data={modalData} />
      <Row>
        <Col className="text-center mt-3 mb-3"><h3>Listado de categorias</h3>
          <Button as={Link} to="/backoffice/categories/create" className="mb-3">
            Nueva categoria
          </Button>
        </Col>
        {/* <div className="row"> */}
        {/* <div className="col"> */}

        {/* </div> */}
      </Row>

      <Table striped bordered hover className="align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Creada</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.status === "fulfilled" &&
            categories.data.length > 0 &&
            categories.data.map((category) => (
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
      {/* </div> */}
    </Container >
  );
}
