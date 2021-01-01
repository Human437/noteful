import React from 'react';
import NotefulContext from './../notefulContext';
import './addNoteMain.css'
import ValidationError from './../validationError'

export default class AddNoteMain extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      name: {
        value: '',
        touched: false,
      },
      folder:{
        value: '',
        touched: false,
      }
    }
  }
  
  static contextType = NotefulContext;

  updateName(name){
    this.setState({name:{value:name, touched:true}})
  }

  updateFolder(folder){
    this.setState({folder:{value:folder, touched:true}})
  }

  validateName(){
    const name = this.state.name.value.trim();
    if (name.length === 0){
      return 'Name is required';
    }
  }

  validateFolder(){
    const folder = this.state.folder.value.trim();
    if (folder.length === 0){
      return 'Select a folder';
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const newNoteName = document.getElementById('addNoteInputName').value.trim();
    const newNoteContent = document.getElementById('addNoteInputContent').value.trim();
    const newNoteFolder = document.getElementById('addNoteInputFolder').value.trim();
    const date = new Date();
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      body: JSON.stringify({
        name: newNoteName,
        content: newNoteContent,
        folderId: newNoteFolder,
        modified: date.toISOString()
      }),
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(json => this.context.handleAddNote(json))
    this.props.history.push('/')
  }

  render(){
    return(
      <form id='addNoteForm' onSubmit = {e =>this.handleSubmit(e)}>
        <h2>Add A New Note</h2>
        <label htmlFor = 'addNoteInputName'>Name</label>
        <br/>
        <input
          type='text'
          name='addNoteInputName'
          id='addNoteInputName'
          placeholder='new note name'
          onChange = {e=> this.updateName(e.target.value)}
        />
        {this.state.name.touched && (<ValidationError message = {this.validateName()}/>)}
        <br/>
        <br/>
        <label htmlFor='addNoteInputContent'>Content</label>
        <br/>
        <textarea
          type='text'
          name='addNoteInputContent'
          id='addNoteInputContent'
          placeholder='new note content'
        ></textarea>
        <br/>
        <br/>
        <label htmlFor='addNoteInputFolder'>Folder</label>
        <br/>
        <select 
          name='addNoteInputFolder' 
          id = 'addNoteInputFolder' 
          onChange = {e=> this.updateFolder(e.target.value)}
        >
          <option value=''>Select a folder</option>
          {this.context.folders.map(folder=>{
            return(
              <option value={folder.id} key={folder.id}>{folder.name}</option>
            )
          })}
        </select>
        {this.state.folder.touched && (<ValidationError message = {this.validateFolder()}/>)}
        <br/>
        <br/>
        <button 
          type='submit'
          disabled={
            this.validateName() ||
            this.validateFolder()
          }
        >
          Add Note
        </button>
      </form>
    )
  }
}