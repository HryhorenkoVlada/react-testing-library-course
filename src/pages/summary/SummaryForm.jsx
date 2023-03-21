import { useState } from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';

const SummaryForm = () => {
  const [toChecked, setToChecked] = useState(false);

  const handleChange = (e) => {
    // e.preventDefault();
    setToChecked(e.target.checked);
  };

  const popover = (
    <Popover id="popover-trigger-click">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      {' '}
      I agree to{' '}
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          id="terms-and-conditions-checkbox"
          type="checkbox"
          checked={toChecked}
          onChange={handleChange}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!toChecked}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
