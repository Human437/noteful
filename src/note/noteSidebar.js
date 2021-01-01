import React from 'react';
import { withRouter } from 'react-router-dom';
import NotefulContext from './../notefulContext';
import PropTypes from 'prop-types';

function NoteSidebar(props){
  return(
    <NotefulContext.Consumer>
      {(value) => {
        const selectedNoteID = props.match.params.noteid;
        const note = value.notes.find(note =>
          note.id ===  selectedNoteID
        )
        const folder = value.folders.find(folder =>
          folder.id === note.folderId
        )
        return(
          <>
            <button onClick = {()=>props.history.push('/')}>Go Back</button>
            <h2>{folder.name}</h2>
          </>
        )
      }}
    </NotefulContext.Consumer>
  );
}

export default withRouter(NoteSidebar);

NoteSidebar.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}