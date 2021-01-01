import React from 'react';

export default function AddNoteSideBar(props){
  return(
    <button onClick = {()=>props.history.push('/')}>Go Back</button>
  )
}