import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState} from "react";

export default function FormDopInfo(props) {
  const {modalId,table,setTable,onHide} = props
  const [numberOfChildren, setNumberOfChildren] = useState(table[modalId].dopInfo.numberOfChildren);
  const [bloodType, setBloodType] = useState(table[modalId].dopInfo.bloodType)
  const handlerChangeNumberOfChildren = (e) => {
    setNumberOfChildren(e.target.value)
  }

  const handlerChangeBloodType = (e) => {
    setBloodType(e.target.value)
  }
  const handleSubmit = (e, id) => {
    e.preventDefault()
    setTable((state) => (
        state.map(
          obj => {
            if (obj.id === id) {
              return Object.assign(obj, obj.dopInfo.bloodType = bloodType,obj.dopInfo.numberOfChildren = numberOfChildren)
            } else {
              return obj
            }
          }
        )
      )
    )
    onHide()
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e, modalId)}>
      <Container>
        <Row className="mb-3 justify-content-md-center" md={2}>
          <Col>Группа крови</Col>
          <Col>
            <Form.Select className="mb-3"
                         name="Группа крови"
                         required
                         onChange={(e) => handlerChangeBloodType(e)}>

              <option>{bloodType}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>

            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3 justify-content-md-center" md={2}>
          <Col>
            <Form.Label>
              Количество детей
            </Form.Label>
          </Col>
          <Col>
            <Form.Control onChange={(e) => handlerChangeNumberOfChildren(e)}
                          value={numberOfChildren}
                          maxLength="2"
                          type="number"
                          min={0}
                          max={30}
                          required/>
          </Col>
        </Row>
        <Row className="mb-3 justify-content-md-center" md={2}>
          <Col>
            <Button onClick={props.onHide} className="m-3" variant="danger">Close</Button>
            <Button className="m-3" variant="primary" type="submit">Submit</Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}