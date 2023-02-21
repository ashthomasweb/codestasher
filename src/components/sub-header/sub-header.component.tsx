/******************************************************************************
* FILENAME:
*   sub-header.component.tsx

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

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  PrimaryCategory
  /* Icons */
} from '../../export-hub'

import './sub-header.styles.scss'

const SubHeader = (props: any): JSX.Element => {
  const {
    state: { primaryCategories, display },
    dispatch,
  } = useContext(MainContext)
  const {
    state: {},
    globalDispatch,
  } = useContext(GlobalContext)

  const toggleAddPane = () => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: true, category: 'primary' }
    })
  }

  return (
    <div className='sub-header-container' style={{height: `${display.subheaderHeight}px`, top: `${display.headerHeight}px` }}>
      {primaryCategories.map((category: string | null, index: number) => {
        return <PrimaryCategory key={index} data={category}/>
      })}
      <button onClick={toggleAddPane}>Add</button>
    </div>
  )
}

export default SubHeader

/* END of document ***********************************************************/
