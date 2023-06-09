import { Alert } from 'react-bootstrap';

const AlertBanner = ({
  variant = 'danger',
  message = 'An unexpected error ocurred. Please try again later ',
}) => {
  return (
    <Alert variant={variant} style={{ backgroundColor: 'red', color: '#fff' }}>
      {message}
    </Alert>
  );
};

export default AlertBanner;
