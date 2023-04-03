import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { loadMemberships } from "../../api";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MembershipPeriod from "../../components/membership-period";
import Button from "react-bootstrap/Button";
import useMembershipState from "./useMembershipState";
import { getMembershipStatus, MembershipStatus } from "./status";
import { isNullOrEmpty } from "./helpers";
import { Badge, Toast, ToastContainer } from "react-bootstrap";
import { UpdateMembershipModal, AddMembershipModal } from "./modals";
import { ConfirmModal } from "../../components/modals";
import distance from "date-fns/formatDistanceStrict";

import "./styles.css";

const Memberships = () => {
  const {
    filters,
    membershipsList,
    handleFilterChange,
    handleSearch,
    handleCreateMembership,
    handleDeleteMembership,
    handleUpdateMembership,
    handleUpdateExpirationDate,
  } = useMembershipState();

  const [showConfirm, setShowConfirm] = useState(false);
  const [showCreateMembership, setShowCreateMembership] = useState(false);
  const [showUpdateMembershipPeriod, setShowUpdateMembershipPeriod] =
    useState(false);
  const [membershipToDelete, setMembershipToDelete] = useState<any>(null);
  const [showClipboardToast, setShowClipboardToast] = useState(false);
  const [membershipToUpdate, setMembershipToUpdate] = useState<any>(null);
  const [membershipToCreate, setMembershipToCreate] = useState<any>(null);
  const [updating, setUpdating] = useState(false);

  const filterByEmailOrPhone = !(
    isNullOrEmpty(filters.email) && isNullOrEmpty(filters.phone)
  );

  const handleConfirmDelete = async () => {
    await handleDeleteMembership(membershipToDelete);
    setShowConfirm(false);
    setMembershipToDelete(null);
  };
  const handleCancelDelete = () => setShowConfirm(false);
  const handleOnDelete = (membership: any) => () => {
    setMembershipToDelete(membership);
    setShowConfirm(true);
  };

  const handleToUpdateMembership = (membership: any) => () => {
    setMembershipToUpdate(membership);
    setShowUpdateMembershipPeriod(true);
  };
  const handleCancelUpdate = () => setShowUpdateMembershipPeriod(false);
  const handleConfirmUpdate = async (expirationDate: Date) => {
    setUpdating(true);
    await handleUpdateExpirationDate(membershipToUpdate.id, expirationDate);
    setUpdating(false);
    setShowUpdateMembershipPeriod(false);
  };

  const handleCancelCreate = () => setShowCreateMembership(false);
  const handleToCreateMembership = () => {
    // setMembershipToCreate(membership);
    setShowCreateMembership(true);
  };

  const handleConfirmCreateMembership = async (membership: any) => {
    //TODO
    setUpdating(true);
    await handleCreateMembership(membership);
    setUpdating(false);
    setShowCreateMembership(false);
  };

  const handleCopyMembershipId = (membershipId: string) => () => {
    setShowClipboardToast(true);
    navigator.clipboard.writeText(membershipId);
  };
  const getMembershipPeriod = (membership: any) => {
    if (!membership.expirationDate) {
      return null;
    }
    const result = distance(
      new Date(membership.updated),
      new Date(membership.expirationDate)
    );

    return result;
  };
  const getMembershipTimeLeft = (membership: any) => {
    if (!membership.expirationDate) {
      return null;
    }
    const result = distance(new Date(), new Date(membership.expirationDate));

    return result;
  };

  return (
    <>
      <ToastContainer position="top-center">
        <Toast
          show={showClipboardToast}
          delay={2000}
          onClose={() => setShowClipboardToast(false)}
          autohide
        >
          <Toast.Body>{`Copiado al portapapeles`}</Toast.Body>
        </Toast>
      </ToastContainer>

      <ConfirmModal
        message={`Está a punto de eliminar la membresía de: ${membershipToDelete?.name} con correo: ${membershipToDelete?.email}`}
        title="Seguro que desea eliminarla?"
        visible={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <UpdateMembershipModal
        loading={updating}
        membership={membershipToUpdate || {}}
        onCancel={handleCancelUpdate}
        onUpdate={handleConfirmUpdate}
        visible={showUpdateMembershipPeriod}
      />

      <AddMembershipModal
        loading={updating}
        membership={{}}
        onCancel={handleCancelCreate}
        onCreate={handleConfirmCreateMembership}
        visible={showCreateMembership}
      />

      <div className="row justify-content-md-center">
        <div className="col-11 mt-4">
          <InputGroup>
            <InputGroup.Text>Correo</InputGroup.Text>
            <Form.Control
              placeholder="example@email.com"
              onChange={(e) =>
                handleFilterChange("email", e.currentTarget.value)
              }
            />
            <InputGroup.Text>Teléfono</InputGroup.Text>
            <Form.Control
              onChange={(e) =>
                handleFilterChange("phone", e.currentTarget.value)
              }
            />
            <DropdownButton
              variant="outline-secondary"
              key={filters.status}
              title={
                filterByEmailOrPhone
                  ? "None"
                  : filters.status.toUpperCase().replace("-", " ")
              }
              onSelect={(value) => handleFilterChange("status", value!)}
              disabled={filterByEmailOrPhone}
            >
              <Dropdown.Item eventKey={MembershipStatus.ACTIVE}>
                Activa
              </Dropdown.Item>
              <Dropdown.Item eventKey={MembershipStatus.EXPIRED}>
                Expirada
              </Dropdown.Item>
              <Dropdown.Item eventKey={MembershipStatus.REQUESTED}>
                Solicitada
              </Dropdown.Item>
            </DropdownButton>
            <Button onClick={handleSearch}>
              <i
                className="bi bi-search"
                style={{ padding: "0 20px 20px" }}
              ></i>
            </Button>
          </InputGroup>
        </div>

        <div className="col-11 mt-4">
          <InputGroup>
            <Button onClick={handleToCreateMembership}>
              <i className="bi bi-plus" style={{ padding: "0 0 15px" }}></i>
              Nueva
            </Button>
          </InputGroup>
        </div>

        <div className="col-11 mt-4">
          {membershipsList && (
            <Badge bg="secondary">{membershipsList.length}</Badge>
          )}
          <Table className="col-11" bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Creada</th>
                <th>Actualizada</th>
                <th>Fecha Expiración</th>
                <th>Valida por</th>
                <th>Categoría</th>
                <th>Copiar/Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {membershipsList.map((membership: any) => (
                <tr key={membership.id}>
                  <td className={getMembershipStatus(membership)}>
                    <div className="row">
                      <p className="col-10 id">{membership.name}</p>
                    </div>
                  </td>
                  <td>{membership.email}</td>
                  <td>{membership.phone}</td>
                  <td>{membership.created}</td>
                  <td>{membership.updated}</td>
                  <td>
                    <Button
                      style={{ marginLeft: 5 }}
                      variant="light"
                      onClick={handleToUpdateMembership(membership)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>{" "}
                    &nbsp;
                    {membership.expirationDate || "null"}
                  </td>
                  <td>
                    {membership.expirationDate && (
                      <>
                        <Badge bg="danger" style={{ marginLeft: 10 }}>
                          {getMembershipTimeLeft(membership)}
                        </Badge>
                        <strong style={{ marginLeft: 2 }}>/</strong>
                        <Badge style={{ marginLeft: 2 }}>
                          {getMembershipPeriod(membership)}
                        </Badge>
                      </>
                    )}
                  </td>
                  <td>{membership.category}</td>
                  <td>
                    <Button
                      variant="outline-secondary"
                      onClick={handleCopyMembershipId(membership.id)}
                    >
                      <i className="bi bi-clipboard"></i>
                    </Button>
                    <Button
                      style={{ marginLeft: 5 }}
                      variant="outline-danger"
                      onClick={handleOnDelete(membership)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Memberships;
