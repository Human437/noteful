import React from 'react';
import STORE from './../dummy-store';
import { Link } from 'react-router-dom';

export default function MainSidebar(){
  return(
    <>
      <ul>
        {STORE.folders.map(folder =>
          <li key = {folder.id} id = 'routeFolderList'>
            <Link to = {`/folder/${folder.name}`}>{folder.name}</Link>
          </li>
        )}
      </ul>
      <br/>
      <button id = 'routeAddFolderBtn'>Add Folder</button>
    </>
  )
}