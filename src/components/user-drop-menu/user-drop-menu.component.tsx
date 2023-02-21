/******************************************************************************
* FILENAME:
*   user-drop-menu.component.tsx

* DESCRIPTION:
*   

* NOTES:
*   - 

* (c) Copyright Ashley Thomas
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'
import { getAuth } from 'firebase/auth'

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './user-drop-menu.styles.scss'

const UserDropMenu = (props: any): JSX.Element => {
  const { dispatch } = useContext(MainContext)
  const { globalDispatch } = useContext(GlobalContext)

  function signOutHandler() {
    const auth = getAuth()
    auth.signOut()
    globalDispatch({ type: 'WELCOME_PAGE_ON' })
    dispatch({ type: 'TOG_USER_DROP_DOWN' })
    globalDispatch({ type: 'SIGN_USER_OUT' })
  }

  return (
    <div className='user-drop-menu'>
      <button
        className='drop-item drop-down-button'
        type='button'
        onClick={signOutHandler}>
        Log Out
      </button>
    </div>
  )
}

export default UserDropMenu

/* END of document ***********************************************************/
