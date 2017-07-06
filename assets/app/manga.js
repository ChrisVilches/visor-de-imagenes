import React from 'react';
import $ from 'jquery';
import { Route, Link } from 'react-router-dom';
import Path from 'path';
import queryString from 'query-string';

export default class Manga extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      dirs: [],
      files: [],
      breadcrumb: [],
      dirUrl: ""
    };


  }

  componentDidMount(){
    this.update();
  }


  showImage(fileName, dirUrl){
    if(typeof fileName !== 'string') return;
    if(fileName.length == 0) return;
    $("#manga-image").attr("src", window.location.protocol + "//" + Path.join(window.location.host, dirUrl, fileName) + '?name');
  }


  update(props){

    if(!props)
      props = this.props;

    var previousDirUrl = this.state.dirUrl;

    var dirUrl = props.location.pathname;
    dirUrl = dirUrl.substr(dirUrl.search('manga/'));
    this.setState({ dirUrl: dirUrl });
    console.log(dirUrl,'==',this.state.dirUrl);

    var parsed = queryString.parse(props.location.search);

    if(parsed.show)
      this.showImage(parsed.show, dirUrl);

    if(previousDirUrl == dirUrl){
      console.log('return')
      return;
    }

    $.ajax({
      url: window.location.protocol + "//" + Path.join(window.location.host, dirUrl),
      data: {
        name: true,
        onlymetadata: true
      }
    }).done(function(data){
      this.setState({
        dirs: data.dirs,
        files: data.files,
        name: data.manga.name,
        breadcrumb: data.breadcrumb,
        dirUrl: dirUrl
      });

    }.bind(this)).catch(function(err){
      console.log(err);
    });
  }



  componentWillReceiveProps(props){
    this.update(props);
  }



	render() {
		return(
      <div>

        <h1>{ this.state.name }</h1>

        <div className="row">
          <div className="col-md-6">
          {this.state.dirs.map(function(m, i){        {this.state.breadcrumb.map(function(m, i){
          return (
          <div><span>{ m }</span>/</div>
          )
        }.bind(this))}
            return (
            <Link to={ Path.join('/spa/', this.state.dirUrl, m) } key={ i }>
              <div><i className="glyphicon glyphicon-folder-open"></i> <span className="folder-name">{ m }</span></div>
            </Link>
            )
          }.bind(this))}
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
          {this.state.files.map(function(m, i){
            return (

            <Link to={ Path.join('/spa/', this.state.dirUrl) + '?show=' + m } key={ i }>
              <div><i className="glyphicon glyphicon-file"></i> <span className="folder-name">{ m }</span></div>
            </Link>
            )
          }.bind(this))}
          </div>
        </div>

        {this.state.breadcrumb.map(function(m, i){
          return (
          <div key={ i }><span>{ m }</span>/</div>
          )
        }.bind(this))}

        <img id="manga-image"></img>


      </div>
		);
	}

}
