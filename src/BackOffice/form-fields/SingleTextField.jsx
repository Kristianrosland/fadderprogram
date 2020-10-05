import React from "react";
import { Form, Input } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const SingleTextField = ({
  text,
  setText,
  errors,
  setErrors,
}) => {
  // Brukes for å vise at feltet er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  return (
    <Form.Group grouped className="form-single-input-group">
      <label className="form-field-header">Post {redStar}</label>

      <Form.Field error={errors.title}>
        {errors.title && <ErrorLabel textKey={"ERROR_NAME_POST"} /> } 
        <Input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setErrors({ ...errors, title: false });
          }}
        />
      </Form.Field>
    </Form.Group>
  );
};

export default SingleTextField;
