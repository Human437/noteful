import React from 'react';
import STORE from './../dummy-store';
import { Link } from 'react-router-dom';
import './mainSidebar.css'

export default function MainSidebar(){
  return(
    <>
      <ul>
        {STORE.folders.map(folder =>
          <li key = {folder.id}  id = {folder.id} className = 'mainSidebarFolderList'>
            <Link 
              id = {folder.id}
              to = {`/folder/${folder.id}`} 
              onClick = {(e)=>{
                const folders = document.getElementsByClassName('selectedFolder');
                while(folders.length)
                  folders[0].classList.remove('selectedFolder')
                document.getElementById(e.target.id).classList.add('selectedFolder');
              }}
            >
              {folder.name}
            </Link>
          </li>
        )}
      </ul>
      <br/>
      <button id = 'mainSidebarFolderBtn'>Add Folder</button>
    </>
  )
}