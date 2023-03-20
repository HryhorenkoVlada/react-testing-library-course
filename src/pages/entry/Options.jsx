import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';

import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import AlertBanner from '../common/AlertBanner';

const Options = ({ optionType }) => {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOption = async () => {
      await axios
        .get(`http://localhost:3030/${optionType}`)
        .then((res) => setOptions(res.data))
        .catch((err) => {
          setError(true);
        });
    };
    fetchOption();
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

  if (error) {
    return <AlertBanner />;
  }

  return (
    <Row>
      {options.map((item) => (
        <ItemComponent
          key={item.name}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </Row>
  );
};

export default Options;
