import React from 'react';
import { withRouter } from 'react-router-dom';

function NoteSidebar(props){
  const selectedNoteID = props.match.params.noteid;
  const note = props.notes.find(note =>
    note.id ===  selectedNoteID
  )
  const folder = props.folders.find(folder =>
    folder.id === note.folderId
  )
  return(
    <>
      <button onClick = {()=>props.history.push('/')}>Go Back</button>
      <h2>{folder.name}</h2>
    </>
  );
}

export default withRouter(NoteSidebar);