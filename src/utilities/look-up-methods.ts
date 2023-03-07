/******************************************************************************
* FILENAME:
*   look-up-methods.ts

* DESCRIPTION:
*   Functions relating to looking up entries within various data structures

* NOTES:
*   - 

* (c) Copyright Ashley Thomas
* Usage Rights: Not for public use or redistribution.

******************************************************************************/

/**
 * @function indexFinder Finds the index of a specfic object within an array
 * @param {array} arrayObj The array literal to search
 * @param {string | number | null} id The id of the object literal to find
 * @returns {number} The index of passed in id
 */
export const indexFinder = (
  arrayObj: any,
  id: string | number | null
): number => {
  // console.log(`Trace: indexFinder()`)
  let newIndex: any
  arrayObj.forEach((item: any) => {
    Number(item.id) === Number(id) && (newIndex = arrayObj.indexOf(item))
  })
  return newIndex
}

/**
 * @function treeSearchAndUpdateInPlace
 * Updates passed in tree object according to passed in arguments
 * @param treeObj Object to be updated
 * @param id Id of object to be updated
 * @param chain childOfChain of entry to be updated
 * @param newEntryValues Object Literal containing key:value pairs of info to update
 * @param toDelete Optional boolean to mark entry as deleted
 * @param codePacket Optional packet containing new code data
 * @returns {void}
 */
export const treeSearchAndUpdateInPlace = (
  treeObj: any,
  id: string | number | null,
  chain: any[],
  newEntryValues: any = null,
  toDelete: boolean = false,
  codePacket: any = null,
): void => {
  // console.log(`Trace: treeSearchAndUpdateInPlace()`)
  console.log(chain)

  let depth
  if (chain === undefined) {
    depth = 1
  } else {
    depth = chain?.length + 1
  }

  function updateFields(self: any) {
    self.title = newEntryValues.title
    self.subtitle = newEntryValues.subtitle
  }

  function markDeleted(self: any) {
    self.deletedAt = new Date().getTime()
  }

  function updateCode(self: any) {
    self.codePacket = codePacket
  }

  let operation
  if (toDelete) {
    operation = markDeleted
  } else if (codePacket !== null) {
    operation = updateCode
  } else {
    operation = updateFields
  }

  if (depth === 1) {
    // primary category [ no ID ]
    console.log('primary')
    let self = treeObj
    operation(self)
  } else if (depth === 2) {
    // subcategory - [top-level working obj ID, ]
    console.log('sub')
    let self = treeObj.entries[indexFinder(treeObj.entries, id)]
    operation(self)
  } else if (depth === 3) {
    // subsubcategory - [top-level working obj ID, subCategoryId,]
    console.log('subsub')
    let primaryEntries = treeObj.entries
    let subEntries =
      primaryEntries[indexFinder(primaryEntries, chain[1])].entries
    let self = subEntries[indexFinder(subEntries, id)]
    operation(self)
  } else if (depth === 4) {
    // finalcategory - [top-level working obj ID, subCategoryId, subsubcotegoryID]
    console.log('final')
    let primaryEntries = treeObj.entries
    let subEntries =
      primaryEntries[indexFinder(primaryEntries, chain[1])].entries
    let subsubEntries = subEntries[indexFinder(subEntries, chain[2])].entries
    let self = subsubEntries[indexFinder(subsubEntries, id)]
    operation(self)
  }
  return treeObj
}

/**
 * @function moveEntry 
 * Uses global drag data to set dragged entry to new destination in working tree
 * @param {Object} dragData Packet containing global drag data from current user drag
 * @param {Object} workingObject State object containing current tree (Primary Category)
 * @param {Object} entry Currently dragged entry
 * @returns {void}
 */
export const moveEntry = (dragData: any, workingObject: any, entry: any): void => {
  let chain =
    dragData.currentDropChain === null
      ? dragData.currentDropPaneChain
      : dragData.currentDropChain
  let id =
    dragData.currentDropPaneId === null
      ? dragData.currentDropId
      : dragData.currentDropPaneId
  let pushEntry: any = findTreeEntry(workingObject, id, chain)
  pushEntry.entries.push(entry)
}

/**
 * @function findTreeEntry
 * Finds and returns entry from within passed tree object
 * @param {} treeObj Tree object to search
 * @param {} entryId Id of node to locate
 * @param {} entryChain Id chain of node to locate
 * @returns {Object} Returns entry at passed argument location
 */
export const findTreeEntry = (
  treeObj: any,
  entryId: any,
  entryChain: any[]
): any => {
  let entry: any
  let depth = entryChain.length
  if (entryChain[0] === undefined) {
    entry = treeObj
  } else if (depth === 1) {
    entry = treeObj.entries[indexFinder(treeObj.entries, entryId)]
  }
  if (depth === 2) {
    let parent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    entry = parent.entries[indexFinder(parent.entries, entryId)]
  }
  if (depth === 3) {
    let gParent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    let parent = gParent.entries[indexFinder(gParent.entries, entryChain[2])]
    entry = parent.entries[indexFinder(parent.entries, entryId)]
  }
  return entry
}

/**
 * @function findTreeEntryParent
 * Returns parent of passed in entry chain
 * @param {Object} treeObj Tree object to search
 * @param {Array} entryChain Node id chain of entry of which to find parent
 * @returns {Object} Parent entry of passed in id chain
 */
export const findTreeEntryParent = (treeObj: any, entryChain: any[]) => {
  let parentEntry
  let depth = entryChain.length
  if (depth === 1) {
    parentEntry = treeObj
  }
  if (depth === 2) {
    let parent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    parentEntry = parent
  }
  if (depth === 3) {
    let gParent = treeObj.entries[indexFinder(treeObj.entries, entryChain[1])]
    let parent = gParent.entries[indexFinder(gParent.entries, entryChain[2])]
    parentEntry = parent
  }
  return parentEntry
}

/**
 * @function removeEntryFromArray
 * Removes node from parent
 * @param {Object} entry Node to remove
 * @param {Object} parentEntry Parent of node to remove
 * @returns {void}
 */
export const removeEntryFromArray = (entry: any, parentEntry: any) => {
  return parentEntry.entries.filter((item: any) => item.id !== entry.id)
}

/* END of document ***********************************************************/
