import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

import { server } from '../../../mocks/server';

import OrderEntry from '../OrderEntry';

test('handles errors for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get('http://localhost:/3030/toppings', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});

test('disable order button when scoopes are not chosen', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitForElementToBeRemoved(() =>
    screen.queryAllByRole('heading', { name: /loading/i })
  );

  const orderButton = screen.getByRole('button', {
    name: /order sundae/i,
  });

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: /vanilla/i,
  });

  await waitFor(() => {
    expect(vanillaInput).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(orderButton).toBeDisabled();
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  await waitFor(() => {
    expect(orderButton).toBeEnabled();
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');

  expect(orderButton).toBeDisabled();
});
