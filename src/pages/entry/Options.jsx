import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

import { formatCurrency } from '../../utilities';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { PRICE_PER_ITEM } from '../../constants';

const Options = ({ optionType }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);

  const [orderDetails, updateItemCount] = useOrderDetails();

  useEffect(() => {
    const fetchOption = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:3030/${optionType}`)
        .then((res) => {
          setOptions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
        });
    };
    fetchOption();
  }, [optionType]);

  const handleUpdateItemCount = (itemName, newItemCount) => {
    updateItemCount(itemName, newItemCount, optionType);
  };

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {orderDetails?.totals[optionType]}
      </p>
      <Row>
        {options?.map((item) => (
          <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
            updateItemCount={handleUpdateItemCount}
          />
        ))}
      </Row>
    </>
  );
};

export default Options;
