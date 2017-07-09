import React from 'react';
import $ from 'jquery';
import Breadcrumb from './breadcrumb';
import Path from 'path';

export default class Photo extends React.Component {

  constructor(props){
		super(props);
    this.state = {
      filePath: "",
      currentDir: "",
      fileName: "",
      currentDirGlobal: ""
    };
  }

  componentWillReceiveProps(props){
    if(typeof props !== 'object') return;
    if(typeof props.filePath !== 'string') return;
    if(props.filePath.trim().length == 0) return;

    var url = window.location.protocol + "//" + Path.join(window.location.host, props.filePath) + '?name';

    var currentDirGlobal = props.location.pathname;
    currentDirGlobal = currentDirGlobal.substr(currentDirGlobal.search('manga/'));

    this.setState({
      filePath: url,
      currentDir: props.filePath.substr(0, props.filePath.lastIndexOf('/')) + '/',
      currentDirGlobal: currentDirGlobal,
      fileName: props.filePath.substr(props.filePath.lastIndexOf('/') + 1)
    });

    $("#manga-image").attr("src", url);
  }

	render() {
		return (
      <div>
        <Breadcrumb 
        url={ this.state.currentDir } 
        currentDir={ this.state.currentDirGlobal.replace('manga/', '') }
        file={ this.state.fileName }></Breadcrumb>

        <img id="manga-image" src={ this.state.filePath }></img>

      </div>
    );


    
	}

}
