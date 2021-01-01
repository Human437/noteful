import React from 'react';
import NotefulContext from './../notefulContext';
import './addNoteMain.css'

export default class AddNoteMain extends React.Component{
  static contextType = NotefulContext;

  handleSubmit(event){
    event.preventDefault();
    console.log('test')
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
        />
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
        <select name='addNoteInputFolder' id = 'addNoteInputFolder'>
          <option value=''>Select a folder</option>
          {this.context.folders.map(folder=>{
            return(
              <option value={folder.name} key={folder.id}>{folder.name}</option>
            )
          })}
        </select>
        <br/>
        <br/>
        <button type='submit'>Add Note</button>
      </form>
    )
  }
}