import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  const submitButton = screen.getByRole('button', { name: 'Confirm order' });
  expect(submitButton).toBeDisabled();
});

test('button is disabled when checkbox is checked and re-enabled when it is unchecked', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: 'I agree to Terms and Conditions',
  });
  const submitButton = screen.getByRole('button', { name: 'Confirm order' });

  fireEvent.click(checkbox);

  expect(submitButton).toBeEnabled();

  fireEvent.click(checkbox);

  expect(submitButton).toBeDisabled();
});

// test('popover responds to hover', () => {
//   render(<SummaryForm />);
//   // popover starts out hidden
//   const nullPopover = screen.queryByText(
//     /no ice cream will actually be delivered/i
//   );
//   expect(nullPopover).not.toBeInTheDocument();

//   // popover appears on mouseover of checkbox label
//   // const termsAndCondition = screen.getByRole('checkbox', {
//   //   name: /terms and conditions/i,
//   // });
//   // // userEvent.hover(termsAndCondition);

//   // // const popover = screen.getByText(/no ice cream will actually be delivered/i);
//   // // expect(popover).toBeInTheDocument();

//   // // popover disappears when we mouse out
//   // userEvent.unhover(termsAndCondition);
//   // await waitForElementToBeRemoved(() =>
//   //   screen.queryByText(/no ice cream will actually be delivered/i)
//   // );
// });
