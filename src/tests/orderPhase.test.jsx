import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

test('ordder phases for "happy path"', async () => {
  render(<App />);

  await waitForElementToBeRemoved(() =>
    screen.queryAllByRole('heading', { name: /loading/i })
  );

  // ------------ Order Entry -------------------

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  const cherryCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });
  const orderButton = screen.getByRole('button', { name: /order sundae/i });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  userEvent.click(cherryCheckbox);

  const summaryScoopsPrice = await screen.findByText(/scoops total/i);
  const summaryToppingsPrice = await screen.findByText(/toppings total/i);
  const summaryGrandTotal = await screen.findByRole('heading', {
    name: /grand total/i,
  });

  await waitFor(() => {
    expect(summaryScoopsPrice).toHaveTextContent('2.00');
  });
  await waitFor(() => {
    expect(summaryToppingsPrice).toHaveTextContent('1.50');
  });
  await waitFor(() => {
    expect(summaryGrandTotal).toHaveTextContent('3.50');
  });

  expect(orderButton).toBeEnabled();
  userEvent.click(orderButton);

  // ------------ Order Summary -------------------

  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole('heading', {
    name: 'Toppings: $1.50',
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();

  const termsAndConditions = screen.getByRole('checkbox', {
    name: /i agree to/i,
  });
  const confirmationButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(termsAndConditions);

  await waitFor(() => {
    expect(confirmationButton).toBeEnabled();
  });

  userEvent.click(confirmationButton);

  // ------------ Order Confirmation -------------------

  const thaknYouHeading = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thaknYouHeading).toBeInTheDocument();

  const orderNumber = await screen.findByRole('heading', {
    name: /order number/i,
  });

  expect(orderNumber).toBeInTheDocument();
  expect(orderNumber).toHaveTextContent('123456');

  const newOrderButton = screen.getByRole('button', {
    name: /create new order/i,
  });

  userEvent.click(newOrderButton);

  // ------------ New Order Entry ---------------------

  const resetScoopsTotal = await screen.findByText(/scoops total/i);
  expect(resetScoopsTotal).toHaveTextContent('0.00');

  const resetToppingsTotal = await screen.findByText(/toppings total/i);
  expect(resetToppingsTotal).toHaveTextContent('0.00');
});

test('toppings header is not on the page if toppings was not choosed', async () => {
  render(<App />);

  // ------------ Order Entry -------------------

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });
  const orderButton = screen.getByRole('button', { name: /order sundae/i });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const summaryScoopsPrice = await screen.findByText(/scoops total/i);

  await waitFor(() => {
    expect(summaryScoopsPrice).toHaveTextContent('6.00');
  });

  userEvent.click(orderButton);

  // ------------ Order Summary -------------------

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', {
    name: 'Toppings',
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});
