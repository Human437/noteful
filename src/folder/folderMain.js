import React from 'react';
import { Link } from 'react-router-dom';
import './../note/noteMain.css';
import './folderMain.css';
import NotefulContext from './../notefulContext';
import PropTypes from 'prop-types';

function FolderMain(props){
  const selectedFolderID = props.match.params.folderID;
  return(
    <NotefulContext.Consumer>
      {(value) => {
        const selectedNotes = value.notes.filter(note => note.folderId === selectedFolderID)
        return(
          <>
            <ul>
              {selectedNotes.map(note => {
                const date = new Date(note.modified);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
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
                            fetch(`http://localhost:9090/notes/${e.target.id}`, {
                              method: 'DELETE',
                              headers: {
                                'content-type': 'application/json'
                              },
                            })
                            value.handleDeleteNote(e.target.id);
                          }}
                        >
                          Delete Note
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
              
            </ul>
            <Link to = '/addNote'>
              <button id = 'addNoteBtn'>Add note</button>
            </Link>
          </>
        )
      }}
    </NotefulContext.Consumer>
  )
}

export default FolderMain;

FolderMain.propTypes = {
  match: PropTypes.object.isRequired
}