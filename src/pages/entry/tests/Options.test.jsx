import {
  render,
  screen,
  cleanup,
} from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

afterEach(cleanup);

test('displays image for each scoop option from server', async () => {
  render(<Options optionType="scoops" />);

  //find the images

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((el) => el.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
  render(<Options optionType="toppings" />);

  //find the images
  const toppingsImages = await screen.findAllByRole('img', {
    name: /topping$/i,
  });
  expect(toppingsImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingsImages.map((el) => el.alt);
  expect(altText).toEqual([
    'Cherries topping',
    'MSMs topping',
    'Hot fudge topping',
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  render(<Options optionType="scoops" />);

  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toBeInTheDocument();
});
