import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import NoteMain from './note/noteMain';
import NoteSidebar from './note/noteSidebar';
import FolderMain from './folder/folderMain';
import MainMain from './main/mainMain';
import MainSidebar from './main/mainSidebar';
import NotefulContext from './notefulContext';
import AddFolderSideBar from './addFolder/addFolderSidebar';
import AddFolderMain from './addFolder/addFolderMain';
import AddNoteSidebar from './addNote/addNoteSidebar';
import AddNoteMain from './addNote/addNoteMain';
import NotefulError from './notefulError';
import config from './config'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      notes: [],
    };
  }

  componentDidMount(){
    fetch(config.API_FOLDER_ENDPOINT,{
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${config.BEARER_TOKEN}`
      })
    })
    .then(response => response.json())
    .then(data => this.setState({folders:data}))
    fetch(config.API_NOTES_ENDPOINT,{
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${config.BEARER_TOKEN}`
      })
    })
    .then(response => response.json())
    .then(data => this.setState({notes:data}))
  }

  handleDeleteNote = (noteId) => {
    this.setState({
        notes: this.state.notes.filter(note => Number(note.id) !== Number(noteId))
    });
  }

  handleAddFolder = (newFolder) =>{
    const folders = this.state.folders
    folders.push(newFolder)
    this.setState({
      folders: folders
    })
  }

  handleAddNote = (newNote) =>{
    const notes = this.state.notes
    notes.push(newNote)
    this.setState({
      notes: notes
    })
  }

  render(){
    return (
      <NotefulContext.Provider
        value = {{
          folders:this.state.folders, 
          notes:this.state.notes,
          handleDeleteNote: this.handleDeleteNote,
          handleAddFolder: this.handleAddFolder,
          handleAddNote: this.handleAddNote,
        }}>
        <>
          <h1><Link to='/'>Noteful</Link></h1>
          <div id = 'container'>
            <NotefulError>
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
                    />
                  )}
                />
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
                  render = {(props) => (
                    <NoteSidebar 
                      {...props} 
                    />
                  )}
                />
                <Route
                  path = '/addFolder'
                  component = {AddFolderSideBar}
                />
                <Route
                  path = '/addNote'
                  component = {AddNoteSidebar}
                />
              </div>
            </NotefulError>
            <NotefulError>
              <main>
                <Route
                  exact path='/'
                  render = {(props) => (
                    <MainMain 
                      {...props} 
                    />
                  )}
                />
                <Route
                  path='/folder/:folderID'
                  render = {(props) => (
                    <FolderMain 
                      {...props} 
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
                    />
                  )}
                />
                <Route
                  path = '/addFolder'
                  component = {AddFolderMain}
                />
                <Route
                  path = '/addNote'
                  component = {AddNoteMain}
                />
              </main>
            </NotefulError>
          </div>  
        </>
      </NotefulContext.Provider>
      
    );
  }
}

export default App;