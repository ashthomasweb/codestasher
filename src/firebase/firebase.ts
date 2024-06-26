/******************************************************************************
* FILENAME:
*   firebase.ts

* DESCRIPTION:
*   Primary database layer. All direct interaction with the firebase websocket
*   for authentication or FireStore database resides in this file.

* NOTES:
*   - dispatch() is passed to several functions in this file, setting state
*     directly from this layer.
*   - 

* Usage Rights: Not for public use or redistribution.

******************************************************************************/

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { newEntry } from '../components/add-pane/add-pane.component'
import cloneDeep from 'lodash.clonedeep'
import { entryType } from '../components/add-pane/add-pane.component'

import {
  getFirestore,
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  setDoc,
  onSnapshot,
} from 'firebase/firestore'

import { firebaseConfig } from './keys'

const app = initializeApp(firebaseConfig)

export const authentication = getAuth(app)

const db = getFirestore()

let domainBasedCollectionName: any

export const userInitializationHandler = async (
  userAuth: any,
  dispatch: any,
  globalDispatch: any,
  additionalData: any = null,
) => {
  if (!userAuth) return

  let domain = userAuth.email
  domainBasedCollectionName = domain

  onSnapshot(doc(db, 'users', domainBasedCollectionName), async (document) => {
    if (!document.exists()) {
      // if no record of user in DB, create record
      const createdAt = new Date()
      const { displayName, email, photoURL, uid } = userAuth
      let user = {
        displayName,
        email,
        photoURL,
        uid,
        createdAt,
        ...additionalData,
      }
      try {
        await setDoc(doc(db, 'users', domainBasedCollectionName), user)
        console.log('no exist')
        await globalDispatch({
          type: 'SET_CURRENT_USER_TO_STATE',
          payload: { userObj: user },
        })
        dispatch({type: 'SIGN_UP_MODAL_TOG'})
        toast('User created!')
      } catch (error: any) {
        console.log('error creating user', error.message)
      }
    } else if (document.exists()) {
      // if record already created, retrieve from DB and add current Auth packet to user for this session
      let userObjFromDB = document.data()
      userObjFromDB = {
        ...userObjFromDB,
        auth: userAuth,
      }
      console.log('exists')
      globalDispatch({
        type: 'SET_CURRENT_USER_TO_STATE',
        payload: { userObj: userObjFromDB },
      })
      dispatch({type: 'SIGN_UP_MODAL_TOG'})

      gatherUserPrimaryCategoriesFromDB(userAuth, globalDispatch)
      toast('User logged in')
    }
  })
}

const backwardCompat = (entryArray: any) => {
  let newClone = cloneDeep(newEntry)
  let array: any[] = []
  entryArray.forEach((entry: entryType) => {
    entry = {
      ...newClone,
      ...entry
    }
   
    array.push(entry)
  })
  return array
}

export const gatherUserPrimaryCategoriesFromDB = async (
  userAuth: any,
  globalDispatch: any
) => {
  if (!userAuth) return
  let primaryCategories: any = []
  let parsedArray: any[] = []
  const userCategoryFirestoreRef = await collection(
    db,
    'users',
    domainBasedCollectionName,
    'primaryCategories'
  )
  const userCategoryQuery = query(userCategoryFirestoreRef)
  const userCategorySnapshot = await getDocs(userCategoryQuery)
  userCategorySnapshot.forEach((doc) => {
    primaryCategories.push(doc.data())
  })
  let compatibileArray = backwardCompat(primaryCategories)
  compatibileArray.forEach((doc) => {
    doc.deletedAt === null && parsedArray.push(doc)
  })
  globalDispatch({
    type: 'SET_PRIMARY_CATEGORIES',
    payload: { primaryCategories: parsedArray },
  })
}

export const gatherSinglePrimaryCategoryFromDB = async (userAuth: any, id: any) => {
  if (!userAuth) return
  let workingObject: any
  const userCategoryFirestoreRef = await collection(
    db,
    'users',
    domainBasedCollectionName,
    'primaryCategories'
  )
  const userCategoryQuery = query(userCategoryFirestoreRef)
  const userCategorySnapshot = await getDocs(userCategoryQuery)
  await userCategorySnapshot.forEach((doc) => {
    if (doc.data().id === id) {
      workingObject = doc.data()
    }
  })
  return workingObject
}

export const savePrimaryCategoryToDB = async (dataPacket: any) => {
  if (dataPacket.title === '') return

  const { id, type, title, subtitle, deletedAt, entries, codePacket, childOfChain } = dataPacket

  const boardFireStoreRef = doc(
    db,
    'users',
    domainBasedCollectionName,
    'primaryCategories',
    `${dataPacket.id}`
  )
  const boardSnapShot = await getDoc(boardFireStoreRef)

  if (!boardSnapShot.exists()) {
    // if no record of user in DB, create record
    let board = {
      id,
      type,
      title,
      subtitle,
      deletedAt,
      entries,
      codePacket,
      childOfChain
    }
    try {
      await setDoc(boardFireStoreRef, board)
      toast('New category saved successfully!')
    } catch (error: any) {
      console.log('error creating category', error.message)
      toast('error creating category')
    }
  } else if (boardSnapShot.exists()) {
    let board = {
      id,
      type,
      title,
      subtitle,
      deletedAt,
      entries,
      codePacket,
      childOfChain
    }
    try {
      await setDoc(boardFireStoreRef, board, { merge: true })
      toast('Category saved successfully!')
    } catch (error: any) {
      console.log('error creating category', error.message)
      toast('error creating category')
    }
  }
}

/* END of document ***********************************************************/
