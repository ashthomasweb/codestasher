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

import App from './App'

test('main header displays site title', () => {
  render(<App />)
  const headingElement = screen.getByTestId('animated-header')
  expect(headingElement.textContent).toBe('Codestasher')
})

test('sign up button is present', () => {
  render(<App />)
  const signUpButton = screen.getByRole('button', { name: /sign up free/i })
  expect(signUpButton).toBeInTheDocument()
})

test('add button opens add pane when clicked', () => {
  render(<App />)
  const addButton = screen.getByRole('button', { name: /add/i })
  let addPane = screen.queryByTestId('add-pane')
  expect(addPane).toBe(null)
  fireEvent.click(addButton)
  // let pane = screen.getByText(/add primary category/i)
  expect(screen.getByText(/add primary category/i)).toBeInTheDocument()
})

/* END of document ***********************************************************/
