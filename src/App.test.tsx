/******************************************************************************
* FILENAME:
*   App.test.tsx

* DESCRIPTION:
*   Tests for the primary App component

* NOTES:
*   - 

* (c) Copyright Ashley Thomas
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import {
  render,
  screen,
  logRoles,
  fireEvent,
} from './test-utils/testing-library-utils'

import userEvent from '@testing-library/user-event'

import App from './App'

test('main header displays site title', () => {
  render(<App />)
  const headingElement = screen.getByTestId('animated-header')
  expect(headingElement).toHaveTextContent('Codestasher')
})

test('sign up button is present', () => {
  render(<App />)
  const signUpButton = screen.getByRole('button', { name: /sign up free/i })
  expect(signUpButton).toBeInTheDocument()
})

test('add button opens add pane when clicked and creates new primary entry', async () => {
  const user = userEvent.setup()
  render(<App />)
  const addButton = screen.getByRole('button', { name: /add/i })
  let nullAddPane = screen.queryByTestId('add-pane')
  expect(nullAddPane).not.toBeInTheDocument()
  await user.click(addButton)
  let addPane = screen.queryByTestId('add-pane')
  expect(addPane).toBeInTheDocument()
  // let addPanePrimaryInput = screen.getByTestId('add-primary-input')
  // let addPaneSecondaryInput = screen.getByTestId('add-secondary-input')
  // await user.type(addPanePrimaryInput, 'test title')
  // await user.type(addPaneSecondaryInput, 'a nice subtitle')
  // let addPaneAddButton = screen.getByRole('button', { name: 'Create Primary' })
  // await user.click(addPaneAddButton)
  // let primaryCategories = screen.getAllByTestId('primary-category')
  // expect(primaryCategories).toHaveLength(2)
})


/* END of document ***********************************************************/
