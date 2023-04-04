import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';

import { server } from '../../../mocks/server';

import OrderConfirmation from '../OrderConfirmation';

test('error alert appears if the post request to create an order was rejected', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  await waitForElementToBeRemoved(
    screen.queryByRole('heading', { name: /loading/i })
  );

  const alert = await screen.findByRole('alert');
  expect(alert).toBeInTheDocument();
});
