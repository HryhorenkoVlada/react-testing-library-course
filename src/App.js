import { Container } from 'react-bootstrap';

import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and Entry page need to be inside a provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* TODO: add confirmation page here */}
    </Container>
  );
}

export default App;
