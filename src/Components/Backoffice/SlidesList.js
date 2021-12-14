import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Container, Modal, Breadcrumb } from 'react-bootstrap'

const SlidesList = () => {

    const [ slides, setSlides ] = useState([]);
    const [ showImage, setShowImage ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ imagePath, setImagePath ] = useState("");

    function handleShowImage(e){
        e.preventDefault();
        setImagePath(e.target.id);
        setShowImage(true);
    }

    function handleCloseImage(){
        setImagePath("");
        setShowImage(false);
    }

    function handleOpenDelete(){
        setShowDelete(true);
    }

    function handleCloseDelete(){
        setShowDelete(false);
    }


    useEffect(() => {
        setSlides([
            {
                "id": 653,
                "name": "Primer Slide",
                "description": "<p>el primero</p>",
                "image": "http://ongapi.alkemy.org/storage/0L0Wwvn8ED.png",
                "order": null,
                "user_id": null,
                "created_at": "2021-12-03T15:19:54.000000Z",
                "updated_at": "2021-12-03T15:19:54.000000Z",
                "deleted_at": null,
                "group_id": null
            },
            {
                "id": 654,
                "name": "Segundo",
                "description": "<p>SEgundo</p>",
                "image": "http://ongapi.alkemy.org/storage/nOdsZfDi1l.png",
                "order": null,
                "user_id": null,
                "created_at": "2021-12-03T15:22:11.000000Z",
                "updated_at": "2021-12-03T15:22:11.000000Z",
                "deleted_at": null,
                "group_id": null
            },
            {
                "id": 655,
                "name": "Tercero",
                "description": "<p>Tercero</p>",
                "image": "http://ongapi.alkemy.org/storage/TKCADpPjQq.png",
                "order": null,
                "user_id": null,
                "created_at": "2021-12-03T15:22:41.000000Z",
                "updated_at": "2021-12-03T15:22:41.000000Z",
                "deleted_at": null,
                "group_id": null
            }
            ])
    },[])

    return(
        <Container>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Backoffice</Breadcrumb.Item>
                <Breadcrumb.Item active>Slides</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Slides</h1>
            <Link className="btn btn-primary mt-2 mb-2" to="/backoffice/slides/create">Crear Slide</Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Título</th>
                    <th>Imagen</th>
                    <th>Orden</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slides.length!==0 && 
                        slides.map((slide)=>(
                            <tr key={slide.name}>
                                <td>{slide.name}</td>
                                <td><Button id={slide.image} onClick={handleShowImage} variant="link">{slide.image}</Button></td>
                                <td>{slide.order}</td>
                                <td className="d-flex justify-content-center">
                                    <div className="text-center d-grid gap-1" style={{gridTemplateColumns: "min-content min-content"}}>
                                        <Button onClick={handleOpenDelete} variant="outline-danger"><i className="bi bi-trash"/></Button>
                                        <Button variant="outline-primary"><i className="bi bi-pencil"/></Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    
                    }
                </tbody>
            </Table>
            <Modal show={showImage} onHide={handleCloseImage}>
                <img src={imagePath}/>
            </Modal>
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                <Modal.Title>Borrar Imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro de que desea borrar esta imagen?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Sí
                </Button>
                <Button variant="primary" onClick={handleCloseDelete}>
                    No
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default SlidesList;