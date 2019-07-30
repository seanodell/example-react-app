import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import { Container, Row, Col, ButtonGroup, Button, Modal } from 'react-bootstrap';

export function Page() {
  const [show, setShow] = useState(false);

  let counter = 1;
  return (
    <div>
      <a target="_blank" href="https://react-bootstrap.github.io/getting-started/introduction/"><h4>Bootstrap UI</h4></a>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <b>This is an alert</b>
        </Modal.Header>
      </Modal>

      <Container>

        <Row>
          <Col md={{ span: 10, order: 1 }}>
            <ButtonGroup aria-label="Basic example">
              <Button variant="secondary" onClick={() => setShow(true)}>Alert</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, order: 2 }}>
            <Button size="lg">Test {counter++}</Button>
          </Col>
          <Col md={{ span: 4, offset: 4, order: 1 }}>
            <Button size="lg">Test {counter++}</Button>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 3, offset: 3 }}>
            <Button size="lg">Test {counter++}</Button>
          </Col>
          <Col md={{ span: 3, offset: 3 }}>
            <Button size="lg">Test {counter++}</Button>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Button size="lg">Test {counter++}</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const application = document.getElementById("application");
application ? ReactDOM.render(<Page />, application) : false;
