import React, { useState, useEffect } from 'react';
import { Table, Container, Breadcrumb, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TrashFill, PencilFill } from 'react-bootstrap-icons';
import ConfirmModal from '../Categories/ConfirmModal';

const mockCategories = [
  {
    id: 1172,
    name: 'Visitas',
    description: 'Visitas',
    image: null,
    parent_category_id: 1,
    created_at: '2021-11-21T14:02:42.000000Z',
    updated_at: '2021-11-25T02:20:51.000000Z',
    deleted_at: null,
    group_id: null,
  },
  {
    id: 1173,
    name: 'Categoria 7',
    description:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>',
    image: 'http://ongapi.alkemy.org/storage/f9eFSqaj2F.jpeg',
    parent_category_id: 0,
    created_at: '2021-11-21T14:02:47.000000Z',
    updated_at: '2021-11-22T14:45:58.000000Z',
    deleted_at: null,
    group_id: null,
  },
  {
    id: 1255,
    name: 'Titulo',
    description: 'Testeando la api',
    image: null,
    parent_category_id: null,
    created_at: '2021-12-01T03:20:30.000000Z',
    updated_at: '2021-12-01T03:20:30.000000Z',
    deleted_at: null,
    group_id: null,
  },
  {
    id: 1205,
    name: 'Entrevista',
    description: 'Programando',
    image: 'http://ongapi.alkemy.org/storage/RHuhR3aAbd.jpeg',
    parent_category_id: null,
    created_at: '2021-11-27T13:52:27.000000Z',
    updated_at: '2021-11-27T13:56:31.000000Z',
    deleted_at: null,
    group_id: null,
  },
];

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
    setCategories(mockCategories);
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
    <Container className='d-flex flex-column'>
      <ConfirmModal showModal={showModal} data={modalData} />
      <div className='row'>
        <div className='col'>
          <Breadcrumb className='mt-3'>
            <Link className='breadcrumb-item' to='/backoffice'>
              Backoffice
            </Link>
            <Breadcrumb.Item active>Categories</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Listado de categorias</h1>
          <Button as={Link} to='/backoffice/categories/create' className='mb-3'>
            Nueva categoria
          </Button>
        </div>

        <Table striped bordered hover className='align-middle'>
          <thead>
            <tr>
              <th>Nombre:</th>
              <th>Creada:</th>
              <th className='text-center'>Acciones:</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id.toString()}>
                <td>{category.name}</td>
                <td>{formatDate(category.created_at)}</td>
                <td className='d-flex justify-content-center gap-1'>
                  <button
                    className='btn btn-outline-danger'
                    title='Eliminar'
                    onClick={() => onDelete(category)}
                  >
                    <TrashFill />
                  </button>

                  <button
                    className='btn btn-outline-primary'
                    title='Editar'
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
