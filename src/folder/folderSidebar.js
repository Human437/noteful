import React from 'react';
import STORE from './../dummy-store';
import './folderSidebar.css';

function FolderSidebar(props){
  return(
    <>
      <ul>
        {STORE.folders.map(folder =>
          <li key = {folder.id} id = 'routeFolderList'>
            {folder.name}
          </li>
        )}
      </ul>
      <br/>
      <button id = 'routeAddFolderBtn'>Add Folder</button>
    </>
  )
}

export default FolderSidebar;