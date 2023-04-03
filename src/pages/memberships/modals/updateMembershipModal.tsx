import { addDays, addMonths, addYears, format } from "date-fns";
import { useState } from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import MembershipPeriod from "../../../components/membership-period";
import {
  TimeMeasureType,
  TimeMeasure,
} from "../../../components/membership-period";

function buildDate(measure: TimeMeasureType, period: number, fromDate: Date) {
  switch (measure) {
    case TimeMeasure.DAYS:
      return addDays(fromDate, period);
    case TimeMeasure.MONTHS:
      return addMonths(fromDate, period);
    case TimeMeasure.YEARS:
      return addYears(fromDate, period);
  }
  return new Date();
}

const UpdateMembershipModal = ({
  loading,
  membership,
  visible,
  onCancel,
  onUpdate,
}: any) => {
  const [period, setPeriod] = useState<any>(null);

  const fromDate = !membership.expirationDate
    ? new Date()
    : membership.originalExpirationDate.toDate();
  const computedDate = period
    ? buildDate(period.measure!, period.value!, fromDate)
    : null;
  const formattedDate = period ? format(computedDate!, "Pp") : "Sin Fecha";
  const label = !membership.expirationDate
    ? "Establecer duración de Membresía"
    : "Extender Membresía";

  const handleUpdate = (fromDate: any) => () => {
    setPeriod(null);
    onUpdate(buildDate(period.measure!, period.value!, fromDate));
  };
  const handleCancel = () => {
    setPeriod(null);
    onCancel();
  };

  return (
    <Modal show={visible} size="sm" centered>
      <Modal.Header>
        <Modal.Title>Editar tiempo de Membresía</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {membership.expirationDate && (
            <p>
              Fecha de expiración{" "}
              <Badge bg="secondary">{membership.expirationDate}</Badge>
            </p>
          )}
          <p>
            {label} <Badge>{formattedDate}</Badge>
          </p>
          <MembershipPeriod onChange={(p: any) => setPeriod(p)} />
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" disabled={loading} onClick={handleCancel}>
          Cerrar
        </Button>
        <Button
          variant="primary"
          disabled={loading}
          onClick={handleUpdate(fromDate)}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateMembershipModal;
