import React from 'react';
import { NavLink} from 'react-router-dom';
import './mainSidebar.css'

export default function MainSidebar(props){ 
  return(
    <>
      <ul>
        {props.folders.map(folder => {      
          return (
            <li key = {folder.id}  id = {folder.id} >
              <NavLink 
                id = {folder.id}
                to = {`/folder/${folder.id}`}
                className = 'mainSidebarFolderList' 
              >
                {folder.name}
              </NavLink>
            </li>
          )
        })}       
      </ul>
      <br/>
      <button id = 'mainSidebarFolderBtn'>Add Folder</button>
    </>  
  )
}