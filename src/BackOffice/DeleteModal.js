import React from "react";
import Modal from "react-modal";
import "./eventManager.scss";
import { Button } from "semantic-ui-react";

// react-modal magi
Modal.setAppElement("#root");
Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.50)";

/**
 * Denne bruker react-modal til å spørre om bekreftelse når man sletter event.
 * Input til komponenten er:
 * eventId:
 *    - Undefined dersom komponenten ikke skal vises (før man har trykket slett)
 *    - Satt til firebase id-en til det eventet som skal slettes
 *
 * events:
 *    - Alle events
 *
 * deleteEvent:
 *    - En funksjon som tar inn en id og sletter den fra firebase
 *
 * cancel:
 *    - En funksjon som kan kalles for å sette eventId tilbake til undefined (altså lukke modalen)
 **/
const DeleteModal = ({ eventId, events, deleteEvent, cancel }) => {
  const showModal = eventId !== undefined;
  const eventName = showModal
    ? events.find((e) => e.id === eventId).title_NO
    : "";

  return (
    <Modal isOpen={showModal} className="delete-event-modal">
      {showModal && (
        <label>
          Er du sikker på at du vil slette <strong>{eventName}</strong>?
        </label>
      )}
      <div className="full-width flex-row margin-top-large">
        <Button secondary onClick={cancel}>
          Nei, gå tilbake
        </Button>
        <Button
          primary
          onClick={() => {
            deleteEvent();
          }}
        >
          Ja, slett!
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
