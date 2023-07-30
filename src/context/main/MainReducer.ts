/******************************************************************************
* FILENAME:
*   MainReducer.ts

* DESCRIPTION:
*   Primary reducer for React useContext Hook pattern.

* NOTES:
*   - Handles display and drag data

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

export const MainReducer = (state: any, action: any) => {

  switch (action.type) {

    case 'SET_WORKING_OBJECT': {
      let workingObject = action.payload.workingObject
      return {
        ...state,
        workingObject: workingObject,
      }
    }

    case 'TOG_USER_DROP_DOWN': {
      // console.log(`Trace: TOG_USER_DROP_DOWN()`)
      let display = {
        ...state.display,
        isUserDropDown: !state.display.isUserDropDown,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_ADD_PANE': {
      // console.log(`Trace: TOG_ADD_PANE()`)
      let display = {
        ...state.display,
        isAddPane: !state.display.isAddPane,
        isAddPrimary: action.payload.isAddPrimary,
        isEdit: action.payload?.isEdit,
        editId: action.payload?.editId,
        idChain: action.payload?.idChain,
        editTitle: action.payload?.title,
        editSubtitle: action.payload?.subtitle,
        category: action.payload?.category,
        currentPrimaryId: action.payload?.currentPrimaryId,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'OPEN_PRIMARY_PANE': {
      let display = {
        ...state.display,
        currentPrimaryEntryData: action.payload.entryData,
        isSubcategoryPaneOpen: true,
        isSubSubcategoryPaneOpen: false,
        isFinalPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_SUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubcategoryPaneOpen: !state.display.isSubcategoryPaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }
    case 'CLOSE_SUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubcategoryPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'OPEN_SUBSUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubcategoryPaneOpen: true,
        isSubSubcategoryPaneOpen: true,
        isFinalPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_SUBSUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubSubcategoryPaneOpen: !state.display.isSubSubcategoryPaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'CLOSE_SUBSUBCAT_PANE': {
      let display = {
        ...state.display,
        isSubSubcategoryPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_FINAL_PANE': {
      let display = {
        ...state.display,
        isFinalPaneOpen: !state.display.isFinalPaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'OPEN_FINAL_PANE': {
      let display = {
        ...state.display,
        isFinalPaneOpen: true,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'CLOSE_FINAL_PANE': {
      let display = {
        ...state.display,
        isFinalPaneOpen: false,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'SET_CURRENT_SUB_ENTRY': {
      // console.log(`Trace: SET_CURRENT_SUB_ENTRY()`)
      let display = {
        ...state.display,
        currentSubEntryData: action.payload.currentSubEntryData,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'SET_FINAL_ID': { // poorly named
      let display = {
        ...state.display,
        finalPaneEntryData: action.payload.finalPaneEntryData,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'OPEN_CODE_PANE': {
      let display = {
        ...state.display,
        isCodePaneOpen: true,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'TOG_CODE_PANE': {
      let display = {
        ...state.display,
        isCodePaneOpen: !state.display.isCodePaneOpen,
      }
      return {
        ...state,
        display: display,
      }
    }

    case 'SIGN_UP_MODAL_TOG': {
      let display = {
        ...state.display,
        isSignUpModalOpen: !state.display.isSignUpModalOpen,
      }
      return {
        ...state,
        display: display,
      }
    }

    
    case 'SIGN_UP_MODAL_CLOSE': {
      let display = {
        ...state.display,
        isSignUpModalOpen: false,
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
