import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Path from 'path';
import Breadcrumb from './breadcrumb';


export default class Manga extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      dirs: [],
      files: [],
      currentDirBreadcrumb: "",
      currentDir: "",
      currentFileDir: "",
      currentFileName: "",
      currentFileBreadcrumb: []
    };


  }

  componentDidMount(){
    this.update();
  }

  componentWillReceiveProps(props){
    this.update(props);
  }

  setImage(fileName, wholeUrl){

    var currentFileDir;
    var _fileName;
    var url;

    if(!wholeUrl){
      currentFileDir = this.props.location.pathname.substr(this.props.location.pathname.search('manga/'));
      url = Path.join(currentFileDir, fileName);
      _fileName = fileName;
    } else {
      currentFileDir = fileName.split('/');
      currentFileDir = currentFileDir.splice(0, currentFileDir.length - 1);
      currentFileDir = currentFileDir.join('/');
      currentFileDir = Path.join('manga', currentFileDir)
      url = Path.join('manga', fileName);
      _fileName = fileName.split('/');
      _fileName = _fileName[_fileName.length - 1];
    }


    this.setState({
      currentFileName: _fileName,
      currentFileDir: currentFileDir,
      currentFileBreadcrumb: currentFileDir
    }, function(){
      $("#manga-image").attr("src", window.location.protocol + "//" + Path.join(window.location.host, url) + '?name');
    });
  }

  update(props){

    if(!props)
      props = this.props;

    var previousCurrentDir = this.state.currentDir;

    var currentDir = props.location.pathname;
    currentDir = currentDir.substr(currentDir.search('manga/'));

    if(previousCurrentDir == currentDir){
      return;
    }

    $.ajax({
      url: window.location.protocol + "//" + Path.join(window.location.host, currentDir),
      data: {
        name: true,
        onlymetadata: true
      }
    }).done(function(data){

      var mangaName = data.manga.name;

      if(mangaName != this.state.name){
        this.setImage(Path.join(mangaName, data.manga.lastPage), true);
      }

      this.setState({
        dirs: data.dirs,
        files: data.files,
        name: mangaName,
        currentDirBreadcrumb: currentDir,
        currentDir: currentDir
      });

    }.bind(this)).catch(function(err){
      console.log(err);
    });
  }

	render() {
		return(
      <div>

        <h1>{ this.state.name }</h1>

        {/* Current directory breadcrumb */}
        <Breadcrumb url={ this.state.currentDirBreadcrumb } currentDir={ this.state.currentDir.replace('manga/', '') }></Breadcrumb>


        {/* Directories */}

          <div className="col-md-3">
          {this.state.dirs.map(function(m, i){
            return (
            <Link to={ Path.join('/spa/', this.state.currentDir, m) } key={ i }>
              <div className="dir-file"><i className="glyphicon glyphicon-folder-open"></i> <span className="folder-name">{ m }</span></div>
            </Link>
            )
          }.bind(this))}

        {/* Files */}
          {this.state.files.map(function(m, i){
            return (
            <a href="javascript:;" key={ i } onClick={ this.setImage.bind(this, m, null) }>
              <div className={ this.state.currentFileName == m && this.state.currentFileDir == this.state.currentDir? 'dir-file current-file' : 'dir-file' }>
                <i className="glyphicon glyphicon-file"></i>
                <span className="folder-name">{ m }</span>
              </div>
            </a>
            )
          }.bind(this))}
          </div>


          <div className="col-md-9 image-show">
            {/* Current file breadcrumb */}
            <Breadcrumb file={ this.state.currentFileName } url={ this.state.currentFileDir } currentDir={ this.state.currentDir.replace('manga/', '') }></Breadcrumb>
            <img id="manga-image"></img>
          </div>







      </div>
		);
	}

}
