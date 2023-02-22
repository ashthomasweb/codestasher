# Codestasher
> Save your code, save your time.
> View live at (https://codestasher.com).

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Known Issues](#known-issues)
* [Status](#status)
* [Contact](#contact)

## General Info
An application for saving your re-useable code snippets in a nested tree data structure, with the ability to create multiple 'files' under each entry, and a simple drag and drop interface.

## Technologies
* TS React 18
* Firebase 9
* SASS
* Ace editor

## Features
* Save multiple 'files' under a single entry, different langagues for each 'file' supported
* Language specific syntax highlighting
* Dev-friendly dark-theme
* Drag and drop your entries within a tree data structure

## Known Issues:
* Large utility functions need to be broken into idempotent parts, particularly tree lookups and CRUD operations
* Upon pasting code into new 'file' doesn't fire the components update onChange logic, additional keyboard action must be taken to save pasted code
* Lack of code comments
* Naming conventions of subpanes need to be clarified
* Potentially componentize all subpanes into one 
* Define remaining 'any' types
* Highlighting issues when dragging entries
* Codepane layout needs more space
* Create basic UX guidance - tooltips, splash page greeting etc.
* Need dropdown with populated language highlighting options, currently relies on proper user entry

## Status
Project is: _in development_

## Contact
Created by Ashley Thomas (https://www.ashthomascode.com/) - feel free to contact me!

<!-- END of document -->
