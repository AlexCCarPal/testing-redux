import { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import "./styles.css";

export const TimeMeasure: any = {
  DAYS: "Days",
  MONTHS: "Months",
  YEARS: "Years",
};

export type TimeMeasureType = typeof TimeMeasure;

const MembershipPeriod = ({ onChange }: any) => {
  const [measure, setMeasure] = useState(TimeMeasure.DAYS);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value) {
      onChange({
        value,
        measure,
      });
    }
  }, [measure, value]);

  return (
    <InputGroup>
      <DropdownButton
        variant="outline-secondary"
        title={measure}
        onSelect={(value) => setMeasure(TimeMeasure[value!])}
      >
        {Object.keys(TimeMeasure).map((k) => (
          <Dropdown.Item key={k} eventKey={k}>
            {TimeMeasure[k]}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Form.Control
        type="number"
        onChange={(value) => setValue(parseInt(value.target.value))}
      />
    </InputGroup>
  );
};

export default MembershipPeriod;
