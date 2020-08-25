import React, { useRef } from "react";
import { Form } from "semantic-ui-react";
import TimeInput from "./TimeInput";

const TimeFields = ({
  startTimeHour,
  setStartTimeHour,
  startTimeMinute,
  setStartTimeMinute,
  endTimeHour,
  setEndTimeHour,
  endTimeMinute,
  setEndTimeMinute,
  errors,
  setErrors,
}) => {
  // Brukes for å vise at feltet er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  // Refs gir en referanse til et felt i GUIet.
  // Her er det snakk om input-feltene for minutter, og de brukes for å hoppe direkte til neste felt etter at man har fylt inn time
  const startTimeMinuteRef = useRef(null);
  const endTimeMinuteRef = useRef(null);

  const setTime = (event, field) => {
    const input = event.target.value;
    for (const c of input.split("")) {
      if (c < "0" || c > "9") return;
    }
    const max = field === "startTimeHour" || field === "endTimeHour" ? 23 : 59;
    if (input.length > 2 || parseInt(input) > max) return;

    if (field === "startTimeHour") {
      if (input.length === 2) startTimeMinuteRef.current.focus();
      setStartTimeHour(input);
    }
    if (field === "startTimeMinute") setStartTimeMinute(input);
    if (field === "endTimeHour") {
      if (input.length === 2) endTimeMinuteRef.current.focus();
      setEndTimeHour(input);
    }
    if (field === "endTimeMinute") setEndTimeMinute(input);
  };

  return (
    <Form.Group grouped className="form-input-group">
      <label className="form-field-header"> Tid </label>
      <div className="flex-row">
        <TimeInput
          title="Start"
          hour={startTimeHour}
          minutes={startTimeMinute}
          setHour={(e) => {
            setTime(e, "startTimeHour");
            setErrors({ ...errors, timeStart: false });
          }}
          setMinute={(e) => {
            setTime(e, "startTimeMinute");
            setErrors({ ...errors, timeStart: false });
          }}
          error={errors.timeStart ? "ERROR_START_TIME" : ""}
          mandatory={redStar}
          minuteRef={startTimeMinuteRef}
        />

        <TimeInput
          title="End"
          hour={endTimeHour}
          minutes={endTimeMinute}
          setHour={(e) => {
            setTime(e, "endTimeHour");
            setErrors({ ...errors, timeEnd: false });
          }}
          setMinute={(e) => {
            setTime(e, "endTimeMinute");
            setErrors({ ...errors, timeEnd: false });
          }}
          error={errors.timeEnd ? "ERROR_END_TIME" : ""}
          mandatory={false}
          containerStyle="margin-left-large"
          minuteRef={endTimeMinuteRef}
        />
      </div>
    </Form.Group>
  );
};

export default TimeFields;
