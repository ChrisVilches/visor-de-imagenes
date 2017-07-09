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
      currentPhoto: ""
    };
  }

  componentDidMount(){
    this.update();
  }

  componentWillReceiveProps(props){
    this.update(props);
  }


  update(props){

    // refactorizar este codigo,
    // hacer que solo haga el AJAX si cambia el directorio
    // pero las otras cosas las puede hacer (como marcar
    // el archivo actual, etc)

    if(!props)
      props = this.props;

    this.setState({
      currentPhoto: props.currentPhoto
    });

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
        this.props.setImage(Path.join('manga', mangaName, data.manga.lastPage));
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
        <Breadcrumb url={ this.state.currentDirBreadcrumb } currentDir={ this.state.currentDir.replace('manga/', '') } ></Breadcrumb>

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
            <a href="javascript:;" key={ i } onClick={ () => this.props.setImage(Path.join(this.state.currentDir, m)) }>
              <div className={ this.state.currentPhoto == Path.join(this.state.currentDir, m) ? 'dir-file current-file' : 'dir-file' }>
                <i className="glyphicon glyphicon-file"></i>
                <span className="folder-name">{ m }</span>
              </div>
            </a>
            )
          }.bind(this))}
          </div>


      </div>
		);
	}

}
