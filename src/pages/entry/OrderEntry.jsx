import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2 style={{ marginTop: '20px' }}>
        Grand total: {orderDetails?.totals.grandTotal}
      </h2>
    </div>
  );
};

export default OrderEntry;
