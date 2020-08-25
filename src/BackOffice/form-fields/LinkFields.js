import React from "react";
import { Form } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const LinkFields = ({
  link,
  setLink,
  linkTextNO,
  setLinkTextNO,
  linkTextEN,
  setLinkTextEN,
  errors,
  setErrors,
}) => {
  return (
    <Form.Group grouped className="form-input-group">
      <label className="form-field-header">Lenke</label>

      <Form.Field>
        <label className="form-field-title">Norsk tekst som vises</label>
        <input
          value={linkTextNO}
          onChange={(e) => setLinkTextNO(e.target.value)}
          type="text"
          autoComplete="off"
        />
      </Form.Field>

      <Form.Field>
        <label className="form-field-title">Engelsk tekst som vises</label>
        <input
          value={linkTextEN}
          onChange={(e) => setLinkTextEN(e.target.value)}
          type="text"
          autoComplete="off"
        />
      </Form.Field>

      <Form.Field error={errors.link}>
        <label className="form-field-title"> Lenke </label>
        {errors.link && <ErrorLabel textKey={"ERROR_LINK"} />}
        <input
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setErrors({ ...errors, link: false });
          }}
          type="text"
          autoComplete="off"
        />
      </Form.Field>
    </Form.Group>
  );
};

export default LinkFields;
