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

  componentDidMount(){
    wheelzoom(document.getElementById('manga-image'));

    $('#manga-image').on('load', function () {
      $("#manga-image").fadeIn();
    });
  }

  componentWillReceiveProps(props){
    if(typeof props !== 'object') return;
    if(typeof props.filePath !== 'string') return;
    if(props.filePath.trim().length == 0) return;

    let oldFile = this.state.filePath + "/" + this.state.fileName;
    let newFile = props.filePath;

    let differentImage = (oldFile != newFile);

    this.setState({
      filePath: Url.removeLast(props.filePath),
      fileName: Url.getFileName(props.filePath),
      currentDir: Url.mangaUrlClean(props.location.pathname)
    }, () => {
      if(differentImage){
        $("#manga-image").hide();
        this.props.imageSourceChanged();
      }
    });

  }


  encode(url){

    return encodeURI(url).replace(/#/g, '%23');

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
        src={ window.location.protocol + "//" + Path.join(Url.host, Url.mangaServiceUrl, this.encode(this.state.filePath), this.encode(this.state.fileName)) + '?name' }
        style={ style }
        className="img-responsive main-photo"
        ></img>

      </div>
    );
	}
}


Photo.propTypes = {
  filePath: PropTypes.string.isRequired,
  imageSourceChanged: PropTypes.func.isRequired
};
