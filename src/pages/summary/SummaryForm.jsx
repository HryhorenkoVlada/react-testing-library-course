import { useState } from 'react';
import { Button, Form, Popover, OverlayTrigger } from 'react-bootstrap';

const SummaryForm = ({ setOrderPhase }) => {
  const [toChecked, setToChecked] = useState(false);

  const handleChange = (e) => {
    setToChecked(e.target.checked);
  };

  const handleConfirmOrder = () => {
    setOrderPhase('confirm');
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
      <Form.Group
        controlId="terms-and-conditions"
        style={{ marginBottom: '20px' }}
      >
        <Form.Check
          id="terms-and-conditions-checkbox"
          type="checkbox"
          checked={toChecked}
          onChange={handleChange}
          label={checkboxLabel}
          style={{ textAlign: 'left' }}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        disabled={!toChecked}
        onClick={handleConfirmOrder}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
