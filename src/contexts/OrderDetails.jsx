import { createContext, useContext, useState, useMemo, useEffect } from 'react';

import { PRICE_PER_ITEM } from '../constants';

const OrderDetailsContext = createContext();

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetailsContext);

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values) {
    optionCount += count;
  }

  return optionCount * PRICE_PER_ITEM[optionType];
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const [totals, setTotals] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('scoops', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updatedItemCount(itemName, newItemCount, optionType) {
      const newOptionsCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      console.log('old optionCounts', optionCounts);
      console.log('newOptionsCounts', newOptionsCounts);

      setOptionsCounts(newOptionsCounts);
    }

    // getter: object containing option counts for scoops and toppings, subtotals and
    // setter: updateOptionCount
    return [{ ...optionCounts, ...totals }, updatedItemCount];
  }, [optionCounts, totals]);

  return <OrderDetailsContext.Provider value={value} {...props} />;
}
