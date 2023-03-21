import {
  render,
  screen,
  cleanup,
} from '../../../test-utils/testing-library-utils';

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
