import { Button, Modal } from "react-bootstrap";

const ConfirmModal = ({
  title,
  message,
  visible,
  onConfirm,
  onCancel,
}: any) => (
  <Modal show={visible}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={onCancel}>
        Cancelar
      </Button>
      <Button variant="primary" onClick={onConfirm}>
        Aceptar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;
