/******************************************************************************
* FILENAME:
*   MainReducer.ts

* DESCRIPTION:
*   Primary reducer for React useContext Hook pattern.

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

export const MainReducer = (state: any, action: any) => {

  switch (action.type) {

    case 'TOG_MODAL': {
      // console.log(`Trace: TOG_MODAL()`)
      let display = {
        ...state.display,
        isModalOpen: !state.display.isModalOpen,
      }
      return {
        ...state,
        display: display,
      }
    }
    
    default: {
      return state
    }
  }
}

/* END of document ***********************************************************/
