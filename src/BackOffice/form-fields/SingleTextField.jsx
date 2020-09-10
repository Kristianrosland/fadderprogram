import React from "react";
import { Form, Input } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const SingleTextField = ({
  descNO,
  setDescNO,
  errors,
  setErrors,
}) => {
  // Brukes for å vise at feltet er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  return (
    <Form.Group grouped className="form-input-group">
      <label className="form-field-header">Post {redStar}</label>

      <Form.Field error={errors.descNO}>
        {errors.descNO && <ErrorLabel textKey={"ERROR_DESC_NO"} />}
        <Input
          value={descNO}
          onChange={(e) => {
            setDescNO(e.target.value);
            setErrors({ ...errors, descNO: false });
          }}
        />
      </Form.Field>
    </Form.Group>
  );
};

export default SingleTextField;
