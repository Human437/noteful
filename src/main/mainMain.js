import React from 'react';
import STORE from './../dummy-store';
import { Link } from 'react-router-dom';

export default function MainMain(){
  return (
    <>
      <ul>
        {STORE.notes.map(note =>{
          const date = new Date(note.modified);
          const year = date.getFullYear();
          const month = date.getMonth()+1;
          const day = date.getDate();
          return (
            <li key = {note.id}>
              <div id = 'noteContainer'>
                <h3><Link to ={`/note/${note.id}`}>{note.name}</Link></h3>
                <div id = 'date-button-box'>
                  <p>Date modified: {`${month}/${day}/${year}`}</p>
                  <button id = 'deleteNoteBtn'>Delete Note</button>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      <button id = 'addNoteBtn'>Add note</button>
    </>
  )
}