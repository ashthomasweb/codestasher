import { render } from '@testing-library/react'
import MainState from '../context/main/MainState'
// import GlobalState from './context/global/GlobalState'

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: MainState, ...options })

export * from '@testing-library/react'

export { renderWithContext as render }