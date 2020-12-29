import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import NoteMain from './note/noteMain';
import NoteSidebar from './note/noteSidebar';
import FolderMain from './folder/folderMain';
import MainMain from './main/mainMain';
import MainSidebar from './main/mainSidebar';

class App extends React.Component {
  render(){
    return (
      <>
        <h1><Link to='/'>Noteful</Link></h1>
        <div id = 'container'>
          <div className = 'sidebar'>
            {/* <Route
              exact path='/'
              component={MainSidebar}
            /> */}
            <Route
              exact path='/'
              render = {(props) => (
                <MainSidebar 
                  {...props} 
                />
              )}
            />
            {/* <Route
              path='/folder/:folderID'
              component={FolderSidebar}
            /> */}
            <Route
              path='/folder/:folderID'
              render = {(props) => (
                <MainSidebar 
                  {...props} 
                />
              )}
            />
            <Route 
              path = '/note/:noteid' 
              component = {NoteSidebar}
            />
          </div>
          <main>
            <Route
              exact path='/'
              component={MainMain}
            />
            <Route
              path='/folder/:folderID'
              // component={(props) => {
              //   console.log(props.match.params.folderID)
              //   return <div />
              // }} 
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