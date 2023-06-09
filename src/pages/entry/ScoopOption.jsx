import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const currentValueFloat = parseFloat(e.target.value);
    const validationCheck =
      0 <= currentValueFloat &&
      currentValueFloat <= 10 &&
      Math.floor(currentValueFloat) === currentValueFloat;

    setIsValid(validationCheck);

    if (validationCheck) {
      updateItemCount(name, e.target.value);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%', marginBottom: '16px' }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: 'left' }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={!isValid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
