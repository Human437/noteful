import React from 'react';
import PropTypes from 'prop-types';

export default function AddFolderSideBar(props){
  return(
    <button onClick = {()=>props.history.push('/')}>Go Back</button>
  )
}

AddFolderSideBar.propTypes = {
  history: PropTypes.object.isRequired
}