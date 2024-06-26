/******************************************************************************
* FILENAME:
*   subcategory-pane.component.tsx

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
  Entry,
  /* Icons */
} from '../../export-hub'

import './subcategory-pane.styles.scss'

const SubcategoryPane = (props: any): JSX.Element => {
  const {
    state: { display, workingObject },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { globalDragData },
    globalDispatch,
  } = useContext(GlobalContext)

  const closePane = (e: any) => {
    dispatch({
      type: 'TOG_SUBCAT_PANE',
    })
    dispatch({
      type: 'CLOSE_SUBSUBCAT_PANE',
    })
    dispatch({
      type: 'CLOSE_FINAL_PANE',
    })
  }

  const addItem = (e: any) => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: false, category: 'sub' },
    })
  }
  let renderArray

  let folderArray = workingObject.entries.filter(
    (entry: any) => entry?.entries.length > 0
  )
  let codeEntry = workingObject.entries.filter(
    (entry: any) => entry?.codePacket.length > 0
  )
  let unknownEntryType = workingObject.entries.filter(
    (entry: any) => entry?.codePacket.length === 0 && entry?.entries.length === 0
  )

  renderArray = [...folderArray, ...unknownEntryType, ...codeEntry]

  const dragIdHandler = (e: any) => {
    e.stopPropagation()
    globalDispatch({
      type: 'SET_DRAG_PANE',
      payload: {
        currentDropPaneId: display.currentPrimaryEntryData.id,
        chain: [...display.currentPrimaryEntryData.childOfChain],
      },
    })
  }

  return (
    <div
      className='subcategory-pane-container'
      onDoubleClick={addItem}
      onDragOver={dragIdHandler}
      style={{
        outline: `${
          display.currentPrimaryEntryData.id ===
          globalDragData.currentDropPaneId
            ? '2px solid #EED202'
            : '2px solid #0000'
        }`,
      }}>
      <h3>{display.currentPrimaryEntryData.title}</h3>
      <p>{display.currentPrimaryEntryData.subtitle}</p>

      {renderArray?.map((entry: any, index: number) => {
        if (entry.deletedAt === null) {
          return (
            <Entry
              key={index}
              data={entry}
              parentChain={display.currentPrimaryEntryData.chain}
              pane='sub'
            />
          )
        } else {
          return null
        }
      })}
      <button onClick={closePane}>X</button>
      <button
        onClick={addItem}
        style={{
          right: `30px`,
          backgroundColor: 'lightgreen',
          color: 'black',
        }}>
        +
      </button>
    </div>
  )
}

export default SubcategoryPane

/* END of document ***********************************************************/
