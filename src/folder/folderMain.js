import React from 'react';
import { Link } from 'react-router-dom';
import './../note/noteMain.css';
import './folderMain.css';
import NotefulContext from './../notefulContext';

function FolderMain(props){
  const selectedFolderID = props.match.params.folderID;
  return(
    <NotefulContext.Consumer>
      {(value) => {
        return(
          <>
            <ul>
              {value.notes.map(note => {
                const date = new Date(note.modified);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                if (note.folderId === selectedFolderID){
                  return(
                    <li key = {note.id}>
                      <div id = 'noteContainer'>
                        <h3><Link to ={`/note/${note.id}`}>{note.name}</Link></h3>
                        <div id = 'date-button-box'>
                          <p>Date modified: {`${month}/${day}/${year}`}</p>
                          <button 
                            id = {note.id} 
                            className = 'deleteNoteBtn'
                            onClick = {(e)=>{
                              console.log(e.target.id)
                              fetch(`http://localhost:9090/notes/${e.target.id}`, {
                                method: 'DELETE',
                                headers: {
                                  'content-type': 'application/json'
                                },
                              })
                              props.history.push('/')
                            }}
                          >
                            Delete Note
                          </button>
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
      }}
    </NotefulContext.Consumer>
  )
}

export default FolderMain;