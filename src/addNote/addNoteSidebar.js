import React from 'react';
import PropTypes from 'prop-types';

export default function AddNoteSideBar(props){
  return(
    <button onClick = {()=>props.history.push('/')}>Go Back</button>
  )
}

AddNoteSideBar.propType = {
  hisotry: PropTypes.object.isRequired
}