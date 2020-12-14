import React from "react";
import { Form, Dropdown } from "semantic-ui-react";
import ErrorLabel from "../ErrorLabel";

const GroupDropdown = ({
  groups,
  group,
  setGroup,
  errors,
  setErrors,
}) => {
  const redStar = <span style={{ color: "red" }}>*</span>;

  return (
    <Form.Group grouped className="form-input-group">
      <label id="add-post-lable-velg-gruppe" className="form-field-header">Startgruppe {redStar}</label>
      <Form.Field error={errors.postGroup && group === ""}>

        {errors.postGroup && group === "" && <ErrorLabel textKey={"ERROR_POST_GROUP"} />}

        <Dropdown
            placeholder="Velg gruppe"
            value={group}
            fluid
            search
            selection
            options={groups}
            onChange={(_, data) => {
                setGroup(data.value);
                setErrors({ ...errors, postGroupsAssigned: false });
            }}
        />
      </Form.Field>
    </Form.Group>
  );
};

export default GroupDropdown;
