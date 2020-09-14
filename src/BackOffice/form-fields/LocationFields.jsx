import React from "react";
import { Form, Button } from "semantic-ui-react";

const LocationFields = ({ address, setAddress, googleMaps, setGoogleMaps }) => {
  const generateGoogleMaps = (input) => {
    if (input.length < 3) {
      setGoogleMaps("");
      return;
    }
    if (input.toLowerCase().indexOf("bergen") === -1) {
      input = input + ", Bergen";
    }

    setGoogleMaps(`https://www.google.com/maps/search/?api=1&query=${input}`);
  };

  return (
    <Form.Group grouped className="form-input-group">
      <Form.Field>
        <label className="form-field-header"> Adresse </label>

        <input
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            if (googleMaps) {
              generateGoogleMaps(e.target.value);
            }
          }}
          type="text"
          autoComplete="off"
        />
      </Form.Field>

      {/** Hvis vi ikke har en google maps link, viser vi knapp for å generere den */}
      {!googleMaps && (
        <div className="flex-row align-center">
          <Button
            type="button"
            disabled={address.length < 3}
            content="Generer lenke til Google maps"
            icon="map"
            labelPosition="left"
            onClick={() => generateGoogleMaps(address)}
            primary
          />
        </div>
      )}

      {/** Hvis vi har en google maps link, viser vi knapp for å fjerne eller teste lenken */}
      {googleMaps && (
        <Button.Group className="margin-top-small">
          <Button type="button" onClick={() => setGoogleMaps("")}>
            Fjern
          </Button>
          <Button.Or text="" />
          <Button
            type="button"
            primary
            onClick={() => window.open(googleMaps, "_blank")}
          >
            Test lenke
          </Button>
        </Button.Group>
      )}
    </Form.Group>
  );
};

export default LocationFields;
