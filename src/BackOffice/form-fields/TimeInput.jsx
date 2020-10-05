import React from "react";
import { Form, Input } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const TimeInput = ({
  title,
  hour,
  setHour,
  minutes,
  setMinute,
  mandatory,
  error,
  containerStyle,
  minuteRef,
}) => {
  return (
    <div className={`${containerStyle} flex-column`}>
      <div className="form-field-title">
        {" "}
        {title} {mandatory}{" "}
      </div>
      {error && <ErrorLabel textKey={error} />}
      <div className="flex-row">
        <Form.Field error={error.length !== 0}>
          <Input
            className="time-input"
            placeholder="00"
            value={hour}
            onChange={setHour}
            type="text"
            autoComplete="off"
          />
        </Form.Field>
        <div className="time-separator flex-row align-center justify-center">
          :
        </div>
        <Form.Field error={error.length !== 0}>
          <Input
            ref={minuteRef}
            className="time-input"
            placeholder="00"
            value={minutes}
            onChange={setMinute}
            type="text"
            autoComplete="off"
          />
        </Form.Field>
      </div>
    </div>
  );
};

export default TimeInput;
