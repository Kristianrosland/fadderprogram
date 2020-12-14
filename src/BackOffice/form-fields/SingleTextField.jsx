import React from "react";
import { Form, Input } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const SingleTextField = ({
  text,
  setText,
  errors,
}) => {
  // Brukes for å vise at feltet er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  return (
    <Form.Group grouped className="form-single-input-group">
      <label className="form-field-header">Post {redStar}</label>

      <Form.Field error={errors.postTitle && text === "" }>

        {errors.postTitle && text === "" &&<ErrorLabel textKey={"ERROR_POST_TITLE"} /> }

        <Input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </Form.Field>
    </Form.Group>
  );
};

export default SingleTextField;
