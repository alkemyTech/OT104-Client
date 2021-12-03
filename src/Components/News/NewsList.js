
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row,  Button, Col, Table, Modal } from 'react-bootstrap';
import { TrashFill, PencilFill } from 'react-bootstrap-icons';

const NewsList = () => {

  const [modalDImg, setModalDImg] = useState({});
  

    const newsMock = [
        {id: 1, name: 'Titulo de prueba 1', image: 'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-01.jpg', createdAt: '17/11/21'},
        {id: 2, name: 'Titulo de prueba 2', image: 'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-02.jpg', createdAt: '18/11/21'},
        {id: 3, name: 'Titulo de prueba 3', image: 'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-03.jpg', createdAt: '19/12/21'},
        {id: 4, name: 'Titulo de prueba 4', image: 'http://www.w-h-p-h.com/wp-content/uploads/2016/06/Test-Cover-04.jpg', createdAt: '20/12/21'}
    ];

    const openModalImg = (src) => {
      setModalDImg({
        open: true,
        src: src,
      });
    };
  
    const closeModalImg = () => {
      setModalDImg({
        open: false,
        src: '',
      });
    };

    


  const toEditForm = () => {
    alert('direcciona a formulario de edicion')
  }

  const RemoveNew = () => {
    alert('elimina la novedad')
  }



    return (    
        <Container className="d-flex flex-column">
            <Row>
              <h1 className="text-center mt-4 mb-4">Listado de Novedades</h1>
             <Col lg="12">
              <Button className="mt-4 mb-4" as={Link} to={`/backoffice/news/create`}>Crear Novedad</Button>
             </Col>
             </Row>
             <Row>
             <Col lg="12">
              <Table hover striped bordered className="align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>createdAt</th>
                    <th className="text-center">Actions</th>
                    </tr>
                </thead>
                  {newsMock.length > 0 ? 
                    newsMock.map((element) => {
                        return(
                            <tbody>
                              <tr>
                                <td>{element.id}</td>
                                <td>{element.name}</td>
                                <td><Button variant="link" onClick={() => openModalImg(element.image)}>Ver imagen</Button></td>
                                <td>{element.createdAt}</td>
                                <td> <div className="d-flex justify-content-around gap-1 text-center">
                                       <button className="btn btn-outline-danger" title="Eliminar" onClick={toEditForm}><TrashFill/></button>
                                       <button className="btn btn-outline-primary" title="Editar" onClick={RemoveNew}><PencilFill/></button>
                                     </div>
                                </td>
                              </tr>
                            </tbody>
                        )
                    })
                :
                    <p>No hay novedades</p>
                }
              </Table> 
             </Col>   
            </Row>
            <Modal show={modalDImg.open} onHide={closeModalImg}>
              <Modal.Body> <img src={modalDImg.src} alt='detail' width='100%' /> </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={closeModalImg}>Close</Button>
              </Modal.Footer>
            </Modal>
        </Container>    
        
    );
}
 
export default NewsList;