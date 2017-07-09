import React from 'react';
import $ from 'jquery';
import Breadcrumb from './breadcrumb';
import Path from 'path';
import Url from './url';
import PropTypes from 'prop-types';

export default class Photo extends React.Component {

  constructor(props){
		super(props);
    this.state = {
      filePath: "",
      fileName: "",
      currentDir: ""
    };
  }

  componentWillReceiveProps(props){
    if(typeof props !== 'object') return;
    if(typeof props.filePath !== 'string') return;
    if(props.filePath.trim().length == 0) return;

    // eliminar estos asserts porque no son universales
    console.assert(props.filePath.search('manga') == -1);
    console.assert(props.filePath.search('spa') == -1);

    this.setState({
      filePath: Url.removeLast(props.filePath),      
      fileName: Url.getFileName(props.filePath),
      currentDir: Url.mangaUrlClean(props.location.pathname)
    });

  }

	render() {
		return (
      <div>
        <Breadcrumb 
        path={ this.state.filePath } 
        currentDir={ this.state.currentDir }
        file={ this.state.fileName }></Breadcrumb>

        <img id="manga-image" src={ 
          window.location.protocol + "//" + Path.join(Url.host, Url.mangaServiceUrl, this.state.filePath, this.state.fileName) + '?name' 
        }></img>

      </div>
    );    
	}
}


Photo.propTypes = {
  filePath: PropTypes.string.isRequired
};




