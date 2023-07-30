/******************************************************************************
* FILENAME:
*   sign-in-up-modal.component.tsx

* DESCRIPTION:
*   This is an area to place a general description of the file. Please limit
*   line length to less than 80. The header delimiter is 80 characters long.
*   Place an asterisk in column 1 to continue blocked comments.

* NOTES:
*   - 

* (c) Copyright Ashley Thomas
* Usage Rights: Not for public use or redistribution.

******************************************************************************/
import React from 'react'

import { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  SignInUp,
  /* Icons */
} from '../../export-hub'

import './sign-in-up-modal.styles.scss'

const SignInUpModal = () => {
  const {
    dispatch,
  } = useContext(MainContext)
  
  const modalToggle = () => {
    dispatch({type: 'SIGN_UP_MODAL_TOG'})
  }

  return (
    <div className='sign-in-and-sign-up'>
      <button
        style={{ position: 'absolute', top: '10px', right: '10px', color: 'white', fontSize: '14px', height: 30, lineHeight: 1.2 }}
        type='button'
        onClick={modalToggle}>
        Close
      </button>
      <SignInUp />
    </div>
  )
}

export default SignInUpModal

/* END of document ***********************************************************/
