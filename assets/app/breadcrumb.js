import React from 'react';
import Path from 'path';
import { Link } from 'react-router-dom';

export default class Breadcrumb extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      breads: [],
      file: ""
    };
  }

  update(props){

    var dirs = props.url.split('/').splice(1);

    var bread = [];
    var full = "";
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
          else return(
            <span>
              <Link to={ Path.join('/spa/manga', m.acum) } key={ i } className="breadcrumb-item">
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
