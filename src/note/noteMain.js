import React from 'react';
import './noteMain.css';
import NotefulContext from './../notefulContext';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import config from './../config'

function NoteMain(props){
  return(
    <NotefulContext.Consumer>
      {(value) => {
        const selectedNoteID = props.match.params.noteid;
        const note = value.notes.find(note =>
          note.id ===  Number(selectedNoteID)
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
                    props.history.push('/')
                  }}
                >
                  Delete Note
                </button>
              </div> 
            </div>
            <p>{note.content}</p>
          </>
        )
      }}
    </NotefulContext.Consumer> 
  );
}

export default withRouter(NoteMain);

NoteMain.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}