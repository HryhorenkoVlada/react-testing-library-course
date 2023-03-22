/**
 * @function formatCurrency
 * Format number as currency (US Dollars)
 *
 * @param {number} amount
 * @returns {string} number formatted as currency.
 *
 * @example
 * formatCurrency (0)
 *
 * // => $0.00
 *
 * @example
 * formatCurrency (1.5)
 *
 * // => $1.50
 *
 */

export const formatCurrency = (amount) => {
  let validateAmount = amount;
  if (Number.isNaN(amount)) validateAmount = 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(validateAmount);
};
