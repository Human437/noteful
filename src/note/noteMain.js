import React from 'react';
import './noteMain.css';
import NotefulContext from './../notefulContext';

function NoteMain(props){
  return(
    <NotefulContext.Consumer>
      {(value) => {
        const selectedNoteID = props.match.params.noteid;
        const note = value.notes.find(note =>
          note.id ===  selectedNoteID
        )
        const date = new Date(note.modified);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        return(
          <>
            <div id = 'noteContainer'>
              <h3>{note.name}</h3>
              <div id = 'date-button-box'>
                <p>Date modified: {`${month}/${day}/${year}`}</p>
                <button id = 'deleteNoteBtn'>Delete Note</button>
              </div> 
            </div>
            <p>{note.content}</p>
          </>
        )
      }}
    </NotefulContext.Consumer> 
  );
}

export default NoteMain;