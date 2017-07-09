import React from 'react';
import $ from 'jquery';
import Path from 'path';
import Url from './url';
import { Link } from 'react-router-dom';

export default class MangaList extends React.Component {

  constructor(props){
		super(props);
    this.state = {
      mangas: []
    };
    $.ajax({ url: Url.mangaServiceUrl })
    .done(function(data){
      this.setState({ 
        mangas: data 
      });
    }.bind(this))
    .catch(function(err){
      console.log(err);
    });
  }


	render() {

		return (
      <div>
        {this.state.mangas.map(function(m){
        return (
          <Link to={ Path.join(Url.mangaSpaUrl, m.name) } key={m.id}>
            <div><i className="glyphicon glyphicon-folder-open"></i> <span className="folder-name">{m.name}</span></div>
          </Link>
        )
        })}

      </div>
    );    
	}
}




