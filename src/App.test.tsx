import React from 'react'
import { render, screen } from '@testing-library/react'
// import { act } from 'react-dom/test-utils'
// import Header from './components/Header'
import App from './App'

test('main header displays site title', () => {
  console.log('\n\nBreak: main header displays site title')
  render(<App />)
  const headingElement = screen.getByTestId('animated-header')
  // console.log(headingElement.textContent)
  expect(headingElement.textContent).toBe('Codestasher')
})

// test('guest data is loaded if no user', () => {
//   console.log('\n\nBreak: guest data is loaded if no user')

//     render(
//       <Header />
//   )
//   const signUpButton = screen.getAllByRole('button')
//   if (signUpButton) {
//     console.log('no user')
//   } else {
//     console.log('user')
//   }
//   console.log(signUpButton)
//   // expect(signUpButton).toBe('Codestasher')
// })
