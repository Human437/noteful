import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import NoteMain from './note/noteMain';
import NoteSidebar from './note/noteSidebar';
import FolderMain from './folder/folderMain';
import FolderSidebar from './folder/folderSidebar';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      noteIndex: 1,
      folderIndex: 1,

    };
  }

  render(){
    return (
      <>
        <h1><Link to='/'>Noteful</Link></h1>
        <div id = 'container'>
          <div className = 'sidebar'>
            <Route
              exact path='/'
              component={FolderSidebar}
            />
            <Route 
              path = '/note/:noteid' 
              component = {NoteSidebar}
            />
          </div>
          <main>
            <Route
              exact path='/'
              component={FolderMain}
            />
            <Route 
              path = '/note/:noteid'
              // component={(props) => {
              //   console.log(props.match.params.noteid)
              //   return <div />
              // }} 
              component = {NoteMain}
            />
          </main>
        </div>  
      </>
    );
  }
}

export default App;