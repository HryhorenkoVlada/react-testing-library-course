import { createContext, useContext, useState, useMemo, useEffect } from 'react';

import { PRICE_PER_ITEM } from '../constants';

// format number as currency
function formatCurrency(amount) {
  let validateAmount = amount;
  if (Number.isNaN(amount)) validateAmount = 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(validateAmount);
}

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

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  optionCounts[optionType].forEach((element) => {
    optionCount += element;
  });

  return optionCount * PRICE_PER_ITEM[optionType];
};

export function OrderDetailsProvider(props) {
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
    function updatedItemCount(itemName, newItemCount, optionType) {
      const newOptionsCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCounts(newOptionsCounts);
    }

    // getter: object containing option counts for scoops and toppings, subtotals and
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updatedItemCount];
  }, [optionCounts, totals]);

  return <OrderDetailsContext.Provider value={value} {...props} />;
}
