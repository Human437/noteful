import React from 'react';
import STORE from './../dummy-store';

function NoteSidebar(props){
  // Replace hard coded index with props.folderIndex l8r
  const selectedNoteID = props.match.params.noteid;
  const note = STORE.notes.find(note =>
    note.id ===  selectedNoteID
  )
  const folder = STORE.folders.find(folder =>
    folder.id === note.folderId
  )
  return(
    <>
      <button>Go Back</button>
      <h2>{folder.name}</h2>
    </>
  );
}

export default NoteSidebar;