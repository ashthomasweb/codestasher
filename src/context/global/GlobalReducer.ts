/******************************************************************************
* FILENAME:
*   GlobalReducer.ts

* DESCRIPTION:
*   Global reducer for React useContext/Reducer Hook pattern.

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import {
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

export const GlobalReducer = (state: any, action: any) => {

  switch (action.type) {

    case 'CHANGE_USER': {
      // console.log(`Trace: CHANGE_USER()`)
      let userObj = {
        ...state.userObj,
        name: state.userObj.name.substring(0,10) + String(Math.ceil(Math.random() * 1000))
      }

      return {
        ...state,
        userObj: userObj,
      }
    }

    default: {
      return state
    }
  }
}

/* END of document ***********************************************************/
