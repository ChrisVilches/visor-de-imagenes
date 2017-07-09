import React from 'react';
import $ from 'jquery';
import Breadcrumb from './breadcrumb';
import Path from 'path';
import Url from './url';
import PropTypes from 'prop-types';
import Zooming from 'zooming';

export default class Photo extends React.Component {

  constructor(props){
		super(props);
    this.state = {
      filePath: "",
      fileName: "",
      currentDir: ""
    };   

  }

  componentDidMount(){
    const zooming = new Zooming({
      bgColor: '#000'
    });

    const img = document.getElementById('manga-image');
    zooming.listen(img);
  }

  componentWillReceiveProps(props){
    if(typeof props !== 'object') return;
    if(typeof props.filePath !== 'string') return;
    if(props.filePath.trim().length == 0) return;

    this.setState({
      filePath: Url.removeLast(props.filePath),      
      fileName: Url.getFileName(props.filePath),
      currentDir: Url.mangaUrlClean(props.location.pathname)
    });

  }



	render() {

    var style = {};
    if(this.state.filePath == ''){
      style = {
        display: 'none'
      };
    }

		return (
      <div>
        <Breadcrumb 
        path={ this.state.filePath } 
        currentDir={ this.state.currentDir }
        file={ this.state.fileName }></Breadcrumb>

        <img 
        id="manga-image" 
        src={ window.location.protocol + "//" + Path.join(Url.host, Url.mangaServiceUrl, this.state.filePath, this.state.fileName) + '?name' }
        style={ style }
        className="img-responsive"
        ></img>

      </div>
    );    
	}
}


Photo.propTypes = {
  filePath: PropTypes.string.isRequired
};




