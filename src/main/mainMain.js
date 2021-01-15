import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from './../notefulContext';
import config from './../config'

export default function MainMain(){
  return (
    <NotefulContext.Consumer>
      {(value) => {
        return(
          <>
            <ul>
              {value.notes.map(note =>{
                const date = new Date(note.modified);
                const year = date.getFullYear();
                const month = date.getMonth()+1;
                const day = date.getDate();
                return (
                  <li key = {note.id}>
                    <div id = 'noteContainer'>
                      <h2><Link to ={`/note/${note.id}`}>{note.name}</Link></h2>
                      <div id = 'date-button-box'>
                        <p>Date modified: {`${month}/${day}/${year}`}</p>
                        <button 
                          id = {note.id} 
                          className = 'deleteNoteBtn'
                          onClick = {(e)=>{
                            fetch(`${config.API_NOTES_ENDPOINT}/${e.target.id}`, {
                              method: 'DELETE',
                              headers: {
                                'content-type': 'application/json',
                                'Authorization': `Bearer ${config.BEARER_TOKEN}`
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