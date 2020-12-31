import React from 'react';
import { NavLink, Link} from 'react-router-dom';
import './mainSidebar.css'
import NotefulContext from './../notefulContext';

export default function MainSidebar(){ 
  return(
    <NotefulContext.Consumer>
      {(value) => {
        return(
          <>
            <ul>
              {value.folders.map(folder => {      
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
            <Link 
              to = {`/addFolder`}
            >
              <button id = 'mainSidebarFolderBtn'>Add Folder</button>
            </Link>
          </> 
        )
      }}
    </NotefulContext.Consumer> 
  )
}