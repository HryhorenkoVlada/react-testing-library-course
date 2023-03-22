import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SummaryForm from '../SummaryForm';

test('Initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  });

  expect(checkbox).not.toBeChecked();

  const submitButton = screen.getByRole('button', { name: 'Confirm order' });
  expect(submitButton).toBeDisabled();
});

test('button is disabled when checkbox is checked and re-enabled when it is unchecked', async () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  });
  const submitButton = screen.getByRole('button', { name: 'Confirm order' });
  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(submitButton).toBeEnabled();

  fireEvent.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(submitButton).toBeDisabled();
});

test('popover responds to hover', async () => {
  render(<SummaryForm />);
  // popover starts out hidden
  const nullPopover = screen.queryByText(/no ice cream/i);
  await waitFor(() => {
    expect(nullPopover).not.toBeInTheDocument();
  });

  // popover appears on mouseover of checkbox label
  // const popover = screen.getByText(/terms and conditions/i);

  // // userEvent.hover(popoverButton);
  // userEvent.hover(popover);
  // await waitFor(() => {
  //   expect(screen.getByText(/no ice cream/i)).toBeInTheDocument();
  // });

  // // popover disappears when we mouse out
  // userEvent.unhover(popover);
  // await waitForElementToBeRemoved(() =>
  //   screen.queryByText(/no ice cream will actually be delivered/i)
  // );
});
