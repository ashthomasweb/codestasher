/******************************************************************************
* FILENAME:
*   sign-in-up.component.tsx

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

import React from 'react'
import { signInWithPopup, GoogleAuthProvider, getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence  } from 'firebase/auth'

import { 
  /* Assets */
  /* Database */
  authentication,
  userInitializationHandler,
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './sign-in-up.styles.scss'

const SignInUp = () => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  const {
    globalDispatch,
  } = useContext(GlobalContext)

  const firebaseSignIn = () => {
    const provider = new GoogleAuthProvider()


    signInWithPopup(authentication, provider)
      .then((result) => {
        // globalDispatch({
        //   type: 'SET_CURRENT_USER_TO_STATE',
        //   payload: { userObj: result.user },
        // })
        let userAuth = getAuth()
        const unSubAuth = onAuthStateChanged(userAuth, async (userAuth: any) => {
          if (result.user) {
            await userInitializationHandler(
              userAuth,
              dispatch,
              globalDispatch,
              null,
              unSubAuth,
              display.isInitialModal
            )
          } else if (result.user == null) {
            console.log('from else/if')
            globalDispatch({
              type: 'SET_CURRENT_USER_TO_STATE',
              payload: { userObj: null },
            })
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>Welcome to CodeStasher</h2>
      <span>
        Save your code.
        <br />
        Organize your process.
      </span>
      <button
        onClick={firebaseSignIn}>
        Sign Up With Google
      </button>
    </div>
  )
}

export default SignInUp

/* END of document ***********************************************************/
