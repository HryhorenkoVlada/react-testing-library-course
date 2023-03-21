import { Container } from 'react-bootstrap';

import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import SummaryForm from './pages/summary/SummaryForm';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and Entry page need to be inside a provider */}

        {/* <OrderEntry /> */}
        <SummaryForm />
      </OrderDetailsProvider>
      {/* TODO: add confirmation page here */}
    </Container>
  );
}

export default App;
