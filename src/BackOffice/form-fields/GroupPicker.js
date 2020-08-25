import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const GroupPicker = ({
  groups,
  setGroups,
  availableGroups,
  errors,
  setErrors,
  editing,
}) => {
  const redStar = <span style={{ color: "red" }}>*</span>;
  const allGroupsSelected = groups.indexOf("all") >= 0;

  const handleCheckbox = (group) => {
    setErrors({ ...errors, groups: false });
    if (group === "duplicate") {
      if (groups.indexOf("duplicate") >= 0) {
        setGroups([]);
      } else {
        setGroups(["duplicate"]);
      }
    } else if (group === "all" && groups.indexOf("all") === -1) {
      setGroups(["all"]);
    } else if (groups.indexOf(group) >= 0) {
      setGroups(groups.filter((g) => g !== group));
    } else if (
      groups.indexOf("all") === -1 &&
      groups.indexOf("duplicate") === -1
    ) {
      setGroups([group, ...groups]);
    }
  };

  return (
    <Form.Group grouped className="form-input-group">
      <label className={"form-field-header"}>
        Gjelder for gruppe(r): {redStar}
      </label>

      {/** Vises kun dersom det finnes en error i groups **/}
      {errors.groups && <ErrorLabel textKey={"ERROR_GROUPS"} />}

      <Form.Field>
        {/** Vi lager en checkbox for hver gruppe man har rettighet til å administrere **/}
        {availableGroups.map((group) => (
          <Checkbox
            key={group}
            label={group === "all" ? "Alle grupper" : `Gruppe ${group}`}
            className={`group-checkbox ${group === "all" ? "full-width" : ""} ${
              errors.groups ? "checkbox-error" : ""
            }`}
            onClick={() => handleCheckbox(group)}
            disabled={
              groups.indexOf("duplicate") >= 0 ||
              (group !== "all" && allGroupsSelected)
            }
            checked={
              groups.indexOf("duplicate") >= 0 ||
              allGroupsSelected ||
              groups.indexOf(group) >= 0
            }
          />
        ))}

        {/** Denne vises kun dersom man oppretter event, ikke dersom man endrer **/}
        {!editing && availableGroups.length >= 2 && (
          <Checkbox
            label={`Lag et separat event for hver gruppe. Nyttig for events som skal ha egen timeplane per gruppe, eks. Bar-til-bar.`}
            className="group-checkbox full-width margin-top-medium"
            onClick={() => handleCheckbox("duplicate")}
            checked={groups.indexOf("duplicate") >= 0}
          />
        )}
      </Form.Field>
    </Form.Group>
  );
};

export default GroupPicker;
