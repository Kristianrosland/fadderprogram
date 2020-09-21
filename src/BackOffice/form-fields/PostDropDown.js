import React from "react";
import { Form, Dropdown } from "semantic-ui-react";

const GroupDropDown = ({groups, group, setGroup, errors, setErrors}) => {
    const redStar = <span style={{ color: "red" }}>*</span>;
    return (
        <Form.Group grouped className="form-input-group">
        <label className="form-field-header">Gruppe {redStar}</label>
            <Dropdown
                placeholder="Velg gruppe"
                value={group}
                fluid
                search
                selection
                options={groups}
                onChange={(_, data) => setGroup(data.value)}
            />
        </Form.Group>
  );
}

export default GroupDropDown;