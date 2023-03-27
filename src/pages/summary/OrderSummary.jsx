import SummaryForm from './SummaryForm';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderSummary = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const { totals, scoops, toppings } = orderDetails;

  const scoopArray = Array.from(scoops, ([name, value]) => ({ name, value }));
  const toppingsArray = Array.from(toppings, ([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {totals?.scoops}</h2>
      <ul>
        {scoopArray.length !== 0
          ? scoopArray.map(({ name, value }) => (
              <li key={`scoop_${name}_${value}`}>
                {value} {name}
              </li>
            ))
          : null}
      </ul>
      <h2>Toppings: {totals?.toppings}</h2>
      <ul>
        {toppingsArray.length !== 0
          ? toppingsArray.map(({ name, value }) => (
              <li key={`topping_${name}_${value}`}>{name}</li>
            ))
          : null}
      </ul>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
