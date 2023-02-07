import { useContext } from 'react'
import { MainContext } from './context/main/MainState'
import { GlobalContext } from './context/global/GlobalState'

import {
  /* Assets */
  /* Database */
  /* Helper Functions */
  /* Components */
  /* Icons */
} from './export-hub'

const App = (props: any): JSX.Element => {
  const {
    state: { display },
    dispatch,
  } = useContext(MainContext)
  const {
    state: { userObj },
    globalDispatch,
  } = useContext(GlobalContext)

  const callFunc = () => {
    dispatch({
      type: 'TOG_MODAL'
    })
  }

  const changeUser = () => {
    globalDispatch({
      type: 'CHANGE_USER',
    })
  }

  const fireTS1 = () => {
  
 function uuidGenerator50Max(idLength: number = 20, forceString: boolean = false): string | number {
      let concatString: string = ''
      for (let i=0; i<3; i++) {
        concatString = concatString + String(Math.ceil(Math.random() * 10e18)).replaceAll('0', String(Math.floor(Math.random() * 9)))
      }
      if (idLength < 18 && !forceString) {
        return Number(concatString.substring(0, idLength))
      } else {
        return concatString.substring(0, idLength)
      }
    }
    
    console.log(uuidGenerator50Max(12, true))
  }

  const fireTS2 = () => {
    function arraySortNumbers(array: (string|number)[], isDescending: boolean = false) {
      function sortDirection(a: string | number, b: string | number) {
        a = Number(a)
        b = Number(b)
        return isDescending ? b - a : a - b
      }
      return array.sort((a, b) => sortDirection(a, b))
    }

    function arraySortByNumFieldValue(
      array: any[],
      keyField: string,
      isDescending: boolean = false
    ) {
      function sortDirection(a: number, b: number) {
        return isDescending ? b - a : a - b
      }
      array.forEach((entry: any) => {
        
      })

      return array.sort((a, b) => sortDirection(a, b))
    }

    let array = [2,5,234,54,'43',23,1,23,4]
    console.log(arraySortNumbers(array, true))

  }

  return (
    <div>
      <button onClick={callFunc}>Toggle Me</button>
      {display.isModalOpen && (
        <div
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: 'lightblue',
          }}>
          I'm a Modal
          <br />
          <button onClick={changeUser}>Change Me</button>
          <br />
          {userObj.name}
          <br />
          <button onClick={fireTS1}>Fire TS 1</button>
          <br />
          <button onClick={fireTS2}>Fire TS 2</button>
        </div>
      )}
    </div>
  )
}

export default App
