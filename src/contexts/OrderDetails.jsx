import { createContext, useContext, useState, useMemo, useEffect } from 'react';

import { formatCurrency } from '../utilities';
import { PRICE_PER_ITEM } from '../constants';

const OrderDetailsContext = createContext();

// create custom hook to check whether we're inside a provider
export const useOrderDetails = () => {
  const context = useContext(OrderDetailsContext);

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;

  if (optionCounts[optionType].size) {
    for (let value of optionCounts[optionType].values()) {
      optionCount += value;
    }
  }

  return optionCount * PRICE_PER_ITEM[optionType];
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updatedItemCount = (itemName, newItemCount, optionType) => {
      const newOptionsCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCounts(newOptionsCounts);
    };

    // getter: object containing option counts for scoops and toppings, subtotals and
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updatedItemCount];
  }, [optionCounts, totals]);

  return <OrderDetailsContext.Provider value={value} {...props} />;
};
