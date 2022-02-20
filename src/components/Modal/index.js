import {Modal} from "react-bootstrap";

import FormDopInfo from "../FormDopInfo";

export default function MydModalWithGrid(props) {

  return (
    <Modal show={props.show} onHide={props.onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Дополнительная информация
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <FormDopInfo {...props}/>
      </Modal.Body>
    </Modal>
  );
}
