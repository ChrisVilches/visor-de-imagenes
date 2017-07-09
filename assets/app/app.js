import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import $ from 'jquery';
import Browser from './browser';
import Add from './add';
import Photo from './photo';
import Url from './url';
import Path from 'path';
import MangaList from './mangalist';

class Layout extends React.Component {

	constructor(props){
		super(props);
		this.state = {			
			filePathPhoto: ""
		};
		
		this.setImage = this.setImage.bind(this);
	}

	setImage(filePath){
		this.setState({
			filePathPhoto: filePath
		});
	}

    render() {

        return (
				<div>
					<div className="row">

						<div className="col-md-4">

							<h2>manga</h2>
							<MangaList/>
							<Add/>
							<Route 
								path={ Path.join(Url.mangaSpaUrl, ':name') }
								render={(props) => <Browser 
								currentPhoto={ this.state.filePathPhoto } 
								setImage={ this.setImage } 
								{...props} />} 
							/>

						</div>   

						<div className="col-md-8">

							<Route render={(props) => <Photo filePath={ this.state.filePathPhoto } {...props}/> } />

						</div>

					</div>
				</div>
        );
    }
}




const app = document.getElementById("app");

ReactDOM.render(<BrowserRouter><Layout/></BrowserRouter>, app);
