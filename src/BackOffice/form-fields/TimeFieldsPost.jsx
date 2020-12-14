import React, { useRef } from "react";
import { Form } from "semantic-ui-react";
import TimeInput from "./TimeInput";

const TimeFieldsPost = ({
  startTimeHour,
  setStartTimeHour,
  startTimeMinute,
  setStartTimeMinute,
  errors,
  setErrors,
}) => {
  // Brukes for å vise at feltet er obligatorisk
  const redStar = <span style={{ color: "red" }}>*</span>;

  // Refs gir en referanse til et felt i GUIet.
  // Her er det snakk om input-feltene for minutter, og de brukes for å hoppe direkte til neste felt etter at man har fylt inn time
  const postStartTimeMinuteRef = useRef(null);

  const setTime = (event, field) => {
    const input = event.target.value;
    for (const c of input.split("")) {
      if (c < "0" || c > "9") return;
    }
    const max = field === "startTimeHour" ? 23 : 59;
    if (input.length > 2 || parseInt(input) > max) return;

    if (field === "startTimeHour") {
      if (input.length === 2) postStartTimeMinuteRef.current.focus();
      setStartTimeHour(input);
    }
    if (field === "startTimeMinute") setStartTimeMinute(input);
  };

  return (
    <Form.Group grouped className="form-input-group">
      <label className="form-field-header"> Starttidspunkt første post {redStar}{" "} </label>
      <div className="flex-row">
        <TimeInput
          hour={startTimeHour}
          minutes={startTimeMinute}
          setHour={(e) => {
            setTime(e, "startTimeHour");
            setErrors({ ...errors, postStartTime: false });
          }}
          setMinute={(e) => {
            setTime(e, "startTimeMinute");
            setErrors({ ...errors, postStartTime: false });
          }}
          error={errors.postStartTime ? "ERROR_POST_START_TIME" : ""}
          minuteRef={postStartTimeMinuteRef}
        />
      </div>
    </Form.Group>
  );
};

export default TimeFieldsPost;
