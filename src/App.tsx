import React from 'react'
import { useContext, useEffect } from 'react'
import { MainContext } from './context/main/MainState'
import { GlobalContext } from './context/global/GlobalState'
import { getAuth } from 'firebase/auth'

import {
  /* Assets */
  guestData,
  /* Database */
  authListener,
  /* Helper Functions */
  /* Components */
  DisplayPane,
  /* Icons */
} from './export-hub'

const App = (props: any): JSX.Element => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  const {
    
    globalDispatch,
  } = useContext(GlobalContext)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Request for 'ace' object comes from cdn, therefore not available for the typecheck on compilation - no actual functional error
    if (window.ace) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - Request for 'ace' object comes from cdn, therefore not available for the typecheck on compilation - no actual functional error
      let editor = window.ace
      dispatch({
        type: 'SET_ACE',
        payload: { aceObj: editor },
      })
    }
  }, [dispatch])

  // dispatch({
  //   type: 'SET_WORKING_OBJECT',
  //   payload: { workingObject: guestData }
  // })
  useEffect(() => {
    dispatch({
      type: 'SET_PRIMARY_CATEGORIES',
      payload: { primaryCategories: [guestData] },
    })
  }, [dispatch])

  let userAuth = getAuth()
  useEffect(() => {
    authListener(display, dispatch, globalDispatch, userAuth)
  }, [dispatch, display, globalDispatch, userAuth])

  return <DisplayPane />
}

export default App
