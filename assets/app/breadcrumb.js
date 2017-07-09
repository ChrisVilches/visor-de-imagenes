import React from 'react';
import Path from 'path';
import { Link } from 'react-router-dom';
import Url from './url';

export default class Breadcrumb extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      breads: [],
      file: ""
    };
  }

  update(props){

    // props.url ----> manga_name/path/to/dir (never a file)
    var dirs = props.url.split('/').filter(e => e.length > 0);

    var bread = [];
    var full = "/";
    for(var i=0; i<dirs.length; i++){
      full = Path.join(full, dirs[i]);

      bread.push({
        name: dirs[i],
        acum: full,
        active: full == props.currentDir
      });
    }

    this.setState({
      breads: bread,
      file: props.file
    });
  }

  componentDidMount(){
    this.update(this.props);
  }

  componentWillReceiveProps(props){
    this.update(props);
  }

  render(){
    return(
      <div>
        {this.state.breads.map(function(m, i){
          if(m.active)
            return <span key={ i }><span className="breadcrumb-item">{ m.name }</span>/</span>;
          return(
            <span key={ i }>
              <Link to={ Path.join(Url.mangaSpaUrl, m.acum) } className="breadcrumb-item">
                <span>{ m.name }</span>
              </Link>/
            </span>
          );
        })}
        <span className="file-name breadcrumb-item">
          { this.state.file }
        </span>
      </div>
    );
  }
}
