import React from 'react';
import STORE from './../dummy-store';
import { Link } from 'react-router-dom'
import './../note/noteMain.css'
import './folderMain.css';

function FolderMain(props){
  const selectedFolderID = STORE.folders[1].id;
  return(
    <>
      <ul>
        {STORE.notes.map(note => {
          if (note.folderId === selectedFolderID){
            return(
              <li key = {note.id}>
                <div id = 'noteContainer'>
                  <h3><Link to ={`/note/${note.id}`}>{note.name}</Link></h3>
                  <div id = 'date-button-box'>
                    <p>Date modified: {note.modified}</p>
                    <button id = 'deleteNoteBtn'>Delete Note</button>
                  </div>
                </div>
              </li>
            )
          }
        })}
      </ul>
      <button id = 'addNoteBtn'>Add note</button>
    </>
  )
}

export default FolderMain;