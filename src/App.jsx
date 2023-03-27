import { useState } from 'react';
import { Container } from 'react-bootstrap';

import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderSummary from './pages/summary/OrderSummary';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const OrderComponent =
    orderPhase === 'inProgress'
      ? OrderEntry
      : orderPhase === 'review'
      ? OrderSummary
      : OrderConfirmation;

  return (
    <Container>
      <OrderDetailsProvider>
        <OrderComponent setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
