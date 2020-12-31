import React from 'react';

export default function AddFolderSideBar(props){
  return(
    <button onClick = {()=>props.history.push('/')}>Go Back</button>
  )
}