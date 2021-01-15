import React from 'react';
import NotefulContext from './../notefulContext';
import './addNoteMain.css'
import ValidationError from './../validationError'
import PropTypes from 'prop-types';
import config from './../config'

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
      },
      content:{
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

  updateContent(content){
    this.setState({content:{value:content, touched:true}})
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

  validateContent(){
    const content = this.state.content.value.trim();
    if (content.length === 0){
      return 'Content is required'
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const newNoteName = document.getElementById('addNoteInputName').value.trim();
    const newNoteContent = document.getElementById('addNoteInputContent').value.trim();
    const newNoteFolder = document.getElementById('addNoteInputFolder').value.trim();
    fetch(config.API_NOTES_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        name: newNoteName,
        content: newNoteContent,
        folderId: newNoteFolder,
      }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.BEARER_TOKEN}`
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
          onChange = {e=> this.updateContent(e.target.value)}
        ></textarea>
        {this.state.folder.touched && (<ValidationError message = {this.validateContent()}/>)}
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
            this.validateFolder() ||
            this.validateContent()
          }
        >
          Add Note
        </button>
      </form>
    )
  }
}

AddNoteMain.propTypes = {
  history: PropTypes.object.isRequired
}