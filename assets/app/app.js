import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import $ from 'jquery';
import Browser from './browser';
import Add from './add';
import Photo from './photo';
import Url from './url';
import Path from 'path';

class Layout extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			mangas: [],
			filePathPhoto: ""
		};

		$.ajax({ url: Url.mangaServiceUrl })
		.done(function(data){
			this.setState({ mangas: data });
		}.bind(this))
		.catch(function(err){
			console.log(err);
		});
		this.setImage = this.setImage.bind(this);
	}

	setImage(filePath){
		this.setState({
			filePathPhoto: filePath
		});
	}

    render() {

        return(
				<div>
					<h2>manga</h2>

						<div className="row">
							<div className="col-md-3">
								{this.state.mangas.map(function(m){
									return (
									<Link to={ Path.join(Url.mangaSpaUrl, m.name) } key={m.id}>
										<div><i className="glyphicon glyphicon-folder-open"></i> <span className="folder-name">{m.name}</span></div>
									</Link>
									)
								})}
								<Add/>
								<Route 
									path={ Path.join(Url.mangaSpaUrl, ':name') }
									render={(props) => <Browser 
										currentPhoto={ this.state.filePathPhoto } 
										setImage={ this.setImage } 
										{...props} />} 
								/>

							</div>
							
							<div className="col-md-9">
								<Route render={(props) => <Photo filePath={ this.state.filePathPhoto } {...props}/> } />
							</div>


						</div>

				</div>
        );
    }
}




const app = document.getElementById("app");

ReactDOM.render(<BrowserRouter><Layout/></BrowserRouter>, app);
