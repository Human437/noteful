import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  handleDeleteNote: () =>{},
})

export default NotefulContext