/******************************************************************************
* FILENAME:
*   pane-container.component.tsx

* DESCRIPTION:
*   

* NOTES:
*   - 

* (c) Copyright Ashley Thomas
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './pane-container.styles.scss'

const PaneContainer = (props: any): JSX.Element => {
  const {
    state: { display }
  } = useContext(MainContext)


  return (
    <div className='pane-container' style={{height: `calc(100vh - ${display.headerHeight + display.subheaderHeight + 10}px)`}}>
      <div className='inner-wrapper'>
        {props.children}
      </div>
    </div>
  )
}

export default PaneContainer

/* END of document ***********************************************************/
