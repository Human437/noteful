import React from 'react';
import STORE from './../dummy-store';
import './noteMain.css'

function NoteMain(props){
  const selectedNoteID = props.match.params.noteid;
  const note = STORE.notes.find(note =>
    note.id ===  selectedNoteID
  )

  return(
    <>
      <div id = 'noteContainer'>
        <h3>{note.name}</h3>
        <div id = 'date-button-box'>
          <p>Date modified: {note.modified}</p>
          <button id = 'deleteNoteBtn'>Delete Note</button>
        </div> 
      </div>
      <p>{note.content}</p>
    </>
  );
}

export default NoteMain;