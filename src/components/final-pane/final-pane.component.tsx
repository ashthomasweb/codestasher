/******************************************************************************
* FILENAME:
*   final-pane.tsx

* DESCRIPTION:
*   

* NOTES:
*   - 

* (c) Copyright Ashley Thomas
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import React, { useContext } from 'react'
import { MainContext } from '../../context/main/MainState'
import { GlobalContext } from '../../context/global/GlobalState'

import {
  /* Assets */
  /* Database */
  /* Helper Functions */
  indexFinder,
  /* Components */
  Entry,
  /* Icons */
} from '../../export-hub'

import './final-pane.styles.scss'

const FinalPane = (props: any): JSX.Element => {
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
      type: 'TOG_FINAL_PANE',
    })
  }

  const addItem = (e: any) => {
    dispatch({
      type: 'TOG_ADD_PANE',
      payload: { isAddPrimary: false, category: 'final' },
    })
  }

  const dragIdHandler = () => {
    globalDispatch({
      type: 'SET_DRAG_PANE',
      payload: {
        currentDropPaneId: display.finalPaneEntryData.id,
        chain: [...display.finalPaneEntryData.childOfChain],
      },
    })
  }

  return (
    <div
      className='final-pane-container'
      onDoubleClick={addItem}
      onDragOver={dragIdHandler}
      style={{
        outline: `${
          display.finalPaneEntryData.id === globalDragData.currentDropPaneId
            ? '2px solid #EED202'
            : '2px solid #0000'
        }`,
      }}>
      <h3>{display.finalPaneEntryData.title}</h3>
      <p>{display.finalPaneEntryData.subtitle}</p>
      {workingObject?.entries[
        indexFinder(workingObject.entries, display.currentSubEntryData.id)
      ].entries[
        indexFinder(
          workingObject.entries[
            indexFinder(workingObject.entries, display.currentSubEntryData.id)
          ].entries,
          display.finalPaneEntryData?.id
        )
      ]?.entries.map((entry: any, index: number) => {
        if (entry.deletedAt === null) {
          return (
            <Entry
              key={index}
              data={entry}
              parentChain={display.finalPaneEntryData.chain}
              pane='final'
            />
          )
        } else {
          return null
        }
      })}
      <button onClick={closePane}>X</button>
      <button
        onClick={addItem}
        style={{ right: `30px`, backgroundColor: 'lightgreen' }}>
        +
      </button>
    </div>
  )
}

export default FinalPane

/* END of document ***********************************************************/
