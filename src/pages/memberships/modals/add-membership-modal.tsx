import { useState } from "react";
import { Button, Modal, Toast, ToastContainer } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Category, CategoryType, validateFields } from "../helpers";

const AddMembershipModal = ({ loading, visible, onCancel, onCreate }: any) => {
  const [category, setCategory] = useState<CategoryType>(null);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [showErrorsToast, setShowErrorsToast] = useState(false);

  const handleConfirm = () => {
    const membership = {
      name,
      email,
      phone,
      created: new Date(),
      expirationDate: null,
      category,
    };
    validateFields(membership)
      ? onCreate(membership)
      : setShowErrorsToast(true);
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal show={visible} size="sm" centered>
      <ToastContainer position="middle-center">
        <Toast
          show={showErrorsToast}
          delay={2000}
          onClose={() => setShowErrorsToast(false)}
          autohide
        >
          <Toast.Body>{`Hay Errores en los campos`}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal.Header>
        <Modal.Title>Agregar Membresía</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup.Text>Nombre</InputGroup.Text>
        <Form.Control
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />
        <InputGroup.Text>correo</InputGroup.Text>
        <Form.Control
          placeholder="example@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputGroup.Text>teléfono</InputGroup.Text>
        <Form.Control
          placeholder="+5353929285"
          onChange={(e) => setPhone(e.target.value)}
        />

        <DropdownButton
          variant="outline-secondary"
          key={category}
          title={!category ? "Seleccione Categoría" : category}
          onSelect={(value) => setCategory(value!)}
        >
          <Dropdown.Item eventKey={Category.STANDARD}>Standard</Dropdown.Item>
          <Dropdown.Item eventKey={Category.GOLD}>Gold</Dropdown.Item>
          <Dropdown.Item eventKey={Category.PREMIUM}>Premium</Dropdown.Item>
        </DropdownButton>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" disabled={loading} onClick={handleCancel}>
          Cerrar
        </Button>
        <Button variant="primary" disabled={loading} onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMembershipModal;
