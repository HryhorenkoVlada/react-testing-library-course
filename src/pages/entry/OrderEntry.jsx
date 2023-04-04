import { Button } from 'react-bootstrap';

import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const orderDisabled = orderDetails?.totals.scoops === '$0.00';

  const handleNextClick = () => {
    setOrderPhase('review');
  };

  return (
    <div style={{ padding: '40px 0px', marginBottom: '40px' }}>
      <h1>Design Your Sundae!</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>
        Grand total: {orderDetails?.totals.grandTotal}
      </h2>
      <Button
        variant="primary"
        type="button"
        disabled={orderDisabled}
        onClick={handleNextClick}
      >
        Order Sundae!
      </Button>
    </div>
  );
};

export default OrderEntry;
