import React from 'react';
import NotefulContext from './../notefulContext';

export default class AddFolderMain extends React.Component{
  static contextType = NotefulContext;

  handleSubmit(event){
    event.preventDefault();
    const newFolderName = document.getElementById('addFolderInput').value.trim();
    if (newFolderName.length === 0){
      alert('Enter a new folder name!!!')
    }else{
      fetch(`http://localhost:9090/folders`, {
        method: 'POST',
        body: JSON.stringify({
          name: newFolderName
        }),
        headers: {
          'content-type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(json => this.context.handleAddFolder(json))
      this.props.history.push('/')
    }
  }

  render(){
    return(
      <form id="addFolderForm" onSubmit= {e=>this.handleSubmit(e)}>
        <h2>Add A New Folder</h2>
        <label htmlFor = 'addFolderInput'>Name Of New Folder</label>
        <br/>
        <input 
          type='text' 
          name='addFolderInput' 
          id ='addFolderInput' 
          placeholder= 'new folder name'
        />
        <br/>
        <br/>
        <button
          type = 'submit'
        >
          Add Folder
        </button>
      </form>
    )
  }
}