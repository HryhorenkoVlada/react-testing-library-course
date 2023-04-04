import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { useOrderDetails } from '../../contexts/OrderDetails';
import AlertBanner from '../common/AlertBanner';

const OrderConfirmation = ({ setOrderPhase }) => {
  const [, , resetOrder] = useOrderDetails();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      await axios
        .post('http://localhost:3030/order')
        .then((res) => {
          setOrderNumber(res.data.orderNumber);
          setLoading(false);
        })
        .catch((error) => {
          // TODO: handle error
          setLoading(false);
          setError(true);
        });
    };

    fetchOrderData();
  }, []);

  const handleCreateOrder = () => {
    resetOrder();
    setOrderPhase('inProgress');
  };

  return loading ? (
    <h3 style={{ padding: '50px', textAlign: 'center', marginTop: '30px' }}>
      Loading...
    </h3>
  ) : (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      {error ? (
        <AlertBanner />
      ) : (
        <>
          <h1>Thank you</h1>
          <h3>Your order number is {orderNumber}</h3>
          <p style={{ fontSize: '10px' }}>
            as per our terms and conditions, nothing will happen now{' '}
          </p>
        </>
      )}

      <Button variant="primary" type="button" onClick={handleCreateOrder}>
        Create new order
      </Button>
    </div>
  );
};

export default OrderConfirmation;
