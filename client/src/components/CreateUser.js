import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import API from "axios";

const CreateUser = ({ submitToggle, setSubmitToggle }) => {
  const [userName, setUserName] = useState("");

  function createUser() {
    API.post(`http://localhost:3000/users`, {
      username: userName,
    });
  }

  return (
    <Row>
      <Form className="create-user">
        <Form.Group>
          <Form.Label>Create User</Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="input name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            createUser();
            setUserName("");
            setSubmitToggle(!submitToggle);
          }}
        >
          Submit
        </Button>
      </Form>
    </Row>
  );
};

export default CreateUser;
