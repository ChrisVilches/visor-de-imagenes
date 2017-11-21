import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Path from 'path';
import Breadcrumb from './breadcrumb';
import Url from './url';
import PropTypes from 'prop-types';


export default class Browser extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      mangaName: "",
      dirs: [],
      files: [],
      currentDir: "",
      currentPhoto: ""
    };
  }

  componentDidMount(){
    this.update(this.props);
  }

  componentWillReceiveProps(props){
    this.update(props);
  }


  next(){
    let next = this.getPrevNextFileNames(this.state.currentPhoto).next;
    if(next == null) return;

    this.props.setImage(Path.join(this.state.currentDir, next));
    this.props.setTitle(this.state.mangaName, next);
  }

  prev(){
    let prev = this.getPrevNextFileNames(this.state.currentPhoto).prev;
    if(prev == null) return;

    this.props.setImage(Path.join(this.state.currentDir, prev));
    this.props.setTitle(this.state.mangaName, prev);
  }



  getPrevNextFileNames(fileName){
    let result = {
      prev: null,
      next: null
    };

    let index = -1;

    for(let i=0; i<this.state.files.length; i++){
      if(fileName.endsWith("/" + this.state.files[i])){
        index = i;
        break;
      }
    }

    if(index == -1) return result;

    try{ result.prev = this.state.files[index-1]; } catch(e){ }
    try{ result.next = this.state.files[index+1]; } catch(e){ }

    return result;
  }


  update(props){


    this.setState({
      currentPhoto: props.currentPhoto
    });

    var currentDir = Url.mangaUrlClean(props.location.pathname);

    if(this.state.currentDir == currentDir){
      return; // Browser path didn't change
    }

    $.ajax({
      url: window.location.protocol + "//" + Path.join(Url.host, Url.mangaServiceUrl, currentDir),
      data: {
        name: true // Search by name, not id
      }
    }).done(function(data){

      var mangaName = data.manga.name;
      var prevMangaName = this.state.mangaName;

      this.setState({
        dirs: data.dirs,
        files: data.files,
        mangaName: mangaName,
        currentDir: currentDir
      }, function(){

        if(mangaName != prevMangaName){
          // Show last image
          this.props.setImage(Path.join('/', mangaName, data.manga.lastPage));
          this.props.setTitle(mangaName, Url.getFileName(data.manga.lastPage));

          // Go to last image directory
          this.props.history.push(Path.join(Url.mangaSpaUrl, mangaName, Url.removeLast(data.manga.lastPage)));
        }
      });

    }.bind(this)).catch(function(err){
      console.log(err);
    });
  }

	render() {
		return(
      <div>

        <h1>{ this.state.mangaName }</h1>

        {/* Current directory breadcrumb */}
        <Breadcrumb path={ this.state.currentDir } currentDir={ this.state.currentDir } ></Breadcrumb>

        {/* Directories */}
        {this.state.dirs.map(function(m, i){
          return (
          <Link to={ Path.join(Url.mangaSpaUrl, this.state.currentDir, m) } key={ i }>
            <div className="browser-directory"><i className="glyphicon glyphicon-folder-open"></i> <span className="folder-name">{ m }</span></div>
          </Link>
          )
        }.bind(this))}

        {/* Files */}
        {this.state.files.map(function(m, i){
          return (
          <a href="javascript:;" key={ i } onClick={ () => {
            this.props.setImage(Path.join(this.state.currentDir, m));
            this.props.setTitle(this.state.mangaName, m);
          } }>
            <div className={ "browser-file " + (this.state.currentPhoto == Path.join(this.state.currentDir, m) ? 'browser-current-file' : '') }>
              <span>{ m }</span>
            </div>
          </a>
          )
        }.bind(this))}

      </div>
		);
	}
}

Browser.propTypes = {
  currentPhoto: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired
};
