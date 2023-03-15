/******************************************************************************
* FILENAME:
*   header.test.tsx

* DESCRIPTION:
*   Tests for the primary Header component

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
} from '../../test-utils/testing-library-utils'

import userEvent from '@testing-library/user-event'
import App from '../../App'


test('header is displayed with title and user login button on load', () => {
    render(<App />) 
    const header = screen.getByTestId('header')
    const title = screen.getByTestId('animated-header')
    const signUpButton = screen.getByRole('button', { name: /sign up free/i })
    expect(header).toContainElement(title)
    expect(header).toContainElement(signUpButton)
})


/* END of document ***********************************************************/
