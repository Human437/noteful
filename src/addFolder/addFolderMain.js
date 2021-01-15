import React from 'react';
import NotefulContext from './../notefulContext';
import ValidationError from './../validationError';
import PropTypes from 'prop-types';
import config from './../config'

export default class AddFolderMain extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      folder:{
        value: '',
        touched: false,
      }
    }
  }

  static contextType = NotefulContext;

  updateFolder(folder){
    this.setState({folder:{value:folder, touched:true}})
  }

  validateFolder(){
    const folder = this.state.folder.value.trim();
    if (folder.length === 0){
      return 'Folder name is required';
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const newFolderName = document.getElementById('addFolderInput').value.trim();
    fetch(config.API_FOLDER_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        name: newFolderName
      }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.BEARER_TOKEN}`
      },
    })
    .then(response => response.json())
    .then(json => this.context.handleAddFolder(json))
    this.props.history.push('/')
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
          onChange = {e=>this.updateFolder(e.target.value)}
        />
        {this.state.folder.touched && (<ValidationError message = {this.validateFolder()}/>)}
        <br/>
        <br/>
        <button
          type = 'submit'
          disabled= {this.validateFolder()}
        >
          Add Folder
        </button>
      </form>
    )
  }
}

AddFolderMain.propTypes = {
  history: PropTypes.object.isRequired
}