/******************************************************************************
* FILENAME:
*   MainState.tsx

* DESCRIPTION:
*   Primary State File.

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { createContext, useReducer, useMemo } from 'react'
import { MainReducer } from './MainReducer'

import {
  /* Types */
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

/** INITIAL TYPE DECLARATION ***************************************/

interface initialStateType {
  display: any
  workingObject: any
}

/** INITIAL STATE DECLARATION **************************************/

const initialState = {
  display: {
    isAddPane: false,
    isUserDropDown: false,
    isAddPrimary: false,
    isEdit: false,
    editId: null,
    isSubcategoryPaneOpen: false,
    headerHeight: 62,
    subheaderHeight: 89,
    isCodePaneOpen: false,
    isSignUpModalOpen: false
  },
  workingObject: {},
}

export const MainContext = createContext<{
  state: initialStateType
  dispatch: React.Dispatch<any>
}>({ state: initialState, dispatch: () => null })

const MainState = (props: any) => {
  const [state, dispatch] = useReducer(MainReducer, initialState)

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  )
}

export default MainState

/* END of document ***********************************************************/
