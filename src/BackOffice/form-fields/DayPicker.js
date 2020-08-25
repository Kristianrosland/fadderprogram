import React from "react";
import { Form, Button } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const DayPicker = ({ day, setDay, errors, setErrors }) => {
  // Red star er stjernen som brukes for å vise at et felt er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  return (
    <Form.Field error={errors.day}>
      <label className="form-field-header"> Dag {redStar} </label>

      {errors.day && <ErrorLabel textKey={"ERROR_DAY"} />}

      <Button.Group className="full-width">
        <Button
          primary={day === "mandag"}
          type="button"
          onClick={() => {
            setDay("mandag");
            setErrors({ ...errors, day: false });
          }}
        >
          Man
        </Button>
        <Button
          primary={day === "tirsdag"}
          type="button"
          onClick={() => {
            setDay("tirsdag");
            setErrors({ ...errors, day: false });
          }}
        >
          Tirs
        </Button>
        <Button
          primary={day === "onsdag"}
          type="button"
          onClick={() => {
            setDay("onsdag");
            setErrors({ ...errors, day: false });
          }}
        >
          Ons
        </Button>
      </Button.Group>
      <Button.Group className="full-width margin-top-small">
        <Button
          primary={day === "torsdag"}
          type="button"
          onClick={() => {
            setDay("torsdag");
            setErrors({ ...errors, day: false });
          }}
        >
          Tors
        </Button>
        <Button
          primary={day === "fredag"}
          type="button"
          onClick={() => {
            setDay("fredag");
            setErrors({ ...errors, day: false });
          }}
        >
          Fre
        </Button>
        <Button
          primary={day === "lørdag"}
          type="button"
          onClick={() => {
            setDay("lørdag");
            setErrors({ ...errors, day: false });
          }}
        >
          Lør
        </Button>
      </Button.Group>
    </Form.Field>
  );
};

export default DayPicker;
