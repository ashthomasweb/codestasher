/******************************************************************************
* FILENAME:
*   ace-window.component.tsx

* DESCRIPTION:
*   

* NOTES:
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import { useContext, useEffect, useRef } from 'react'
import { MainContext } from '../../context/main/MainState'

import { 
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from '../../export-hub'

import './ace-window.styles.scss'

const AceWindow = (props: any): JSX.Element => {
  const {
    state: { aceObj, editorPacket },
    dispatch,
  } = useContext(MainContext)

  const currentEditor = useRef(null)

  const Ace = aceObj

  useEffect(() => {

    var editor = Ace.edit(`editor ${props.id}`)
    editor.setTheme('ace/theme/chaos')
    function setEditor() {
      editor.setValue('')
      editor.session.setMode(`ace/mode/${props.language}`)
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        maxLines: Infinity,
      })
      editor.session.insert({ row: 1, column: 0 }, props.codeContent)
      if (props.codeContent === '') {
      editor.setValue('\r\r\r\r')
      }
    
    }
    setEditor()

  }, [
    props.id,
    Ace,
    props.codeContent,
    dispatch,
    props.language,
  ])

  const updateFileContent = (e: any, index: number) => {
    var editor = Ace.edit(`editor ${props.id}`)
    let newCodeContent = editor.getValue()
      editorPacket.codePacket[index].content = newCodeContent
    }

  return (
    <div
      id={`editor ${props.id}`}
      onInput={(e) => updateFileContent(e, props.id)} // props.id is the index of parent
      ref={currentEditor}
    />
  )
}

export default AceWindow

/* END of document ***********************************************************/
