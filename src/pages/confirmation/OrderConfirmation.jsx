import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      await axios
        .post('http://localhost:3030/order')
        .then((res) => {
          setOrderNumber(res.data.orderNumber);
        })
        .catch((error) => {
          // TODO: handle error
        });
    };

    fetchOrderData();
  }, []);

  const handleCreateOrder = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  return orderNumber ? (
    <div style={{ textAlign: 'center' }}>
      <h1>Thank you</h1>
      <h3>Your order number is {orderNumber}</h3>
      <p style={{ fontSize: '10px' }}>
        as per our terms and conditions, nothing will happen now{' '}
      </p>
      <Button variant="primary" type="button" onClick={handleCreateOrder}>
        Create new order
      </Button>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default OrderConfirmation;
