import {
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';
import OrderEntry from '../OrderEntry';

afterEach(() => {
  cleanup();
});

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('heading', { name: /loading/i })
  );

  // make sure total starts out $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  await waitFor(() => {
    expect(scoopSubtotal).toHaveTextContent('2.00');
  });

  // update chocolate scoops to 2 and check the subtotal

  const chocolateInput = await screen.findByRole('spinbutton', {
    name: /chocolate/i,
  });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  await waitFor(() => {
    expect(scoopSubtotal).toHaveTextContent('6.00');
  });
});

test('update toppings subtotal when toppings are changed', async () => {
  render(<Options optionType="toppings" />);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('heading', { name: /loading/i })
  );

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });

  await waitFor(() => {
    expect(toppingsSubtotal).toBeInTheDocument();
  });

  // assert that initial price is 0.00
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // find a checkbox for cherry topping
  const cherryToppingCheckbox = await screen.findByRole('checkbox', {
    name: /cherries/i,
  });

  // click the checkbox
  userEvent.click(cherryToppingCheckbox);

  expect(cherryToppingCheckbox).toBeChecked();
  // assert that price was changed to 1.50
  await waitFor(() => {
    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });

  // find another checkbox
  const mandmsToppingCheckbox = await screen.findByRole('checkbox', {
    name: /MSMs/i,
  });

  // click
  userEvent.click(mandmsToppingCheckbox);

  expect(mandmsToppingCheckbox).toBeChecked();
  // assert that price was increased to 3.00
  await waitFor(() => {
    expect(toppingsSubtotal).toHaveTextContent('3.00');
  });

  // uncheck one of checkboxes
  userEvent.click(mandmsToppingCheckbox);

  expect(mandmsToppingCheckbox).not.toBeChecked();
  // assert that price was changed
  await waitFor(() => {
    expect(toppingsSubtotal).toHaveTextContent('1.50');
  });
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent('0.00');
  });

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    const cherryToppingCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    await waitFor(() => {
      expect(grandTotal).toHaveTextContent('2.00');
    });

    userEvent.click(cherryToppingCheckbox);

    await waitFor(() => {
      expect(grandTotal).toHaveTextContent('3.50');
    });
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    const cherryToppingCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    userEvent.click(cherryToppingCheckbox);

    await waitFor(() => {
      expect(grandTotal).toHaveTextContent('1.50');
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    await waitFor(() => {
      expect(grandTotal).toHaveTextContent('3.50');
    });
  });

  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);

    const grandTotal = await screen.findByRole('heading', {
      name: /grand total: \$/i,
    });
    const vanillaInput = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    });
    const cherryToppingCheckbox = await screen.findByRole('checkbox', {
      name: /cherries/i,
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '3');
    userEvent.click(cherryToppingCheckbox);

    await waitFor(() => {
      expect(grandTotal).toHaveTextContent('7.50');
    });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');

    await waitFor(() => {
      expect(grandTotal).toHaveTextContent('5.50');
    });

    userEvent.click(cherryToppingCheckbox);
    await waitFor(() => {
      expect(grandTotal).toHaveTextContent('4.00');
    });
  });
});
