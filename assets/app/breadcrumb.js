import React from 'react';
import Path from 'path';
import { Link } from 'react-router-dom';
import Url from './url';
import PropTypes from 'prop-types';


const separator = (
  <span className="breadcrumb-separator">
    <i className="glyphicon glyphicon-chevron-right"></i>
  </span>
);

export default class Breadcrumb extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      breads: [],
      file: ""
    };
  }

  update(props){

    // props.path = manga_name/path/to/dir (never a file)
    var dirs = props.path.split('/').filter(e => e.length > 0);

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
      <div className="breadcrumb-container">
        {this.state.breads.map(function(m, i){
          return(
            <span key={ i }>
              <Link to={ Path.join(Url.mangaSpaUrl, m.acum) }>
                <span className={ "breadcrumb-item " + (m.active ? "breadcrumb-item-active" : "") }>{ m.name }</span>
              </Link>
              { i < this.state.breads.length - 1 && separator }
            </span>
          );
        }.bind(this))}
        <span className="breadcrumb-item">
          { this.state.file && separator }
          { this.state.file }
        </span>
      </div>
    );
  }
}

Breadcrumb.propTypes = {
  path: PropTypes.string.isRequired,
  currentDir: PropTypes.string.isRequired,
  file: PropTypes.string
};
