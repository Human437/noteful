import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import NoteMain from './note/noteMain';
import NoteSidebar from './note/noteSidebar';
import FolderMain from './folder/folderMain';
import MainMain from './main/mainMain';
import MainSidebar from './main/mainSidebar';
import NotefulContext from './notefulContext';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      notes: [],
    };
  }

  componentDidMount(){
    fetch('http://localhost:9090/folders')
      .then(response => response.json())
      .then(data => this.setState({folders:data}))
    fetch(`http://localhost:9090/notes`)
      .then(response => response.json())
      .then(data => this.setState({notes:data}))
  }

  render(){
    return (
      <NotefulContext.Provider
        value = {{folders:this.state.folders, notes:this.state.notes}}>
        <>
          <h1><Link to='/'>Noteful</Link></h1>
          <div id = 'container'>
            <div className = 'sidebar'>
              {/* You can choose to use component or render, component takes precedent over render
              Use render when you have to past props */}
              {/* <Route
                exact path='/'
                component={MainSidebar}
              /> */}
              <Route
                exact path='/'
                render = {(props) => (
                  <MainSidebar 
                    {...props}
                    folders = {this.state.folders}
                  />
                )}
              />
              {/* <Route
                path='/folder/:folderID'
                component={MainSidebar}
              /> */}
              <Route
                path='/folder/:folderID'
                render = {(props) => (
                  <MainSidebar 
                    {...props} 
                    folders = {this.state.folders}
                  />
                )}
              />
              <Route 
                path = '/note/:noteid' 
                render = {(props) => (
                  <NoteSidebar 
                    {...props} 
                    notes = {this.state.notes}
                    folders = {this.state.folders}
                  />
                )}
              />
            </div>
            <main>
              <Route
                exact path='/'
                render = {(props) => (
                  <MainMain 
                    {...props} 
                    notes = {this.state.notes}
                  />
                )}
              />
              <Route
                path='/folder/:folderID'
                render = {(props) => (
                  <FolderMain 
                    {...props} 
                    notes = {this.state.notes}
                  />
                )}
              />
              <Route 
                path = '/note/:noteid'
                // component={(props) => {
                //   console.log(props.match.params.noteid)
                //   return <div />
                // }} 
                render = {(props) => (
                  <NoteMain 
                    {...props} 
                    notes = {this.state.notes}
                  />
                )}
              />
            </main>
          </div>  
        </>
      </NotefulContext.Provider>
      
    );
  }
}

export default App;