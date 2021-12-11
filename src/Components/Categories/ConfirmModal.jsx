import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmModal({ showModal, data }) {
  return (
    <Modal size="sm" show={showModal} centered>
      <Modal.Body>
        <p className="modal-title text-center">
          ¿Estas seguro de borrar la siguiente categoria?
        </p>
      </Modal.Body>
      <Modal.Body className="text-center">
        <span className="fs-5">{data?.name}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={data?.onCancel}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={data?.onConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
