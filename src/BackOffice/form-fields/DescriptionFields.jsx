import React from "react";
import { Form, TextArea } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const DescriptionFields = ({
  descNO,
  setDescNO,
  descEN,
  setDescEN,
  errors,
  setErrors,
}) => {
  // Brukes for å vise at feltet er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  return (
    <Form.Group grouped className="form-input-group">
      <label className="form-field-header">Beskrivelse {redStar}</label>

      <Form.Field error={errors.descNO}>
        <label className="form-field-title"> Norsk </label>
        {errors.descNO && <ErrorLabel textKey={"ERROR_DESC_NO"} />}
        <TextArea
          error={errors.desc}
          value={descNO}
          onChange={(e) => {
            setDescNO(e.target.value);
            setErrors({ ...errors, descNO: false });
          }}
        />
      </Form.Field>

      <Form.Field error={errors.descEN}>
        <label className="form-field-title"> Engelsk </label>
        {errors.descEN && <ErrorLabel textKey={"ERROR_DESC_EN"} />}
        <TextArea
          error={errors.desc}
          value={descEN}
          onChange={(e) => {
            setDescEN(e.target.value);
            setErrors({ ...errors, descEN: false });
          }}
        />
      </Form.Field>
    </Form.Group>
  );
};

export default DescriptionFields;
