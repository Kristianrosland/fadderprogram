import React from "react";
import { Form, Input } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

/**
 * Komponent for å vise input til norsk og engelsk tittel.
 * NO = norsk, EN = engelsk
 */
const TitleFields = ({
  titleNO,
  setTitleNO,
  titleEN,
  setTitleEN,
  errors,
  setErrors,
}) => {
  // Brukes for å vise at feltet er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  return (
    <Form.Group grouped className="form-input-group">
      <label className="form-field-header"> Tittel {redStar} </label>

      <Form.Field error={errors.titleNO}>
        <label className="form-field-title"> Norsk </label>
        {errors.titleNO && <ErrorLabel textKey={"ERROR_TITLE_NO"} />}
        <Input
          value={titleNO}
          onChange={(e) => {
            setTitleNO(e.target.value);
            setErrors({ ...errors, titleNO: false });
          }}
          type="text"
          autoComplete="off"
        />
      </Form.Field>

      <Form.Field error={errors.titleEN}>
        <label className="form-field-title"> Engelsk </label>
        {errors.titleEN && <ErrorLabel textKey={"ERROR_TITLE_EN"} />}
        <Input
          value={titleEN}
          onChange={(e) => {
            setTitleEN(e.target.value);
            setErrors({ ...errors, titleEN: false });
          }}
          type="text"
          autoComplete="off"
        />
      </Form.Field>
    </Form.Group>
  );
};

export default TitleFields;
