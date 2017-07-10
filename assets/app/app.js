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

	setTitle(mangaName, fileName){
		document.title = mangaName + " | " + fileName;
	}

  render() {

      return (

				<div className="row">

					<div className="col-md-3">
						<div className="panel-body">

							<MangaList/>
							<Add/>
							<Route
								path={ Path.join(Url.mangaSpaUrl, ':name') }
								render={(props) => <Browser
								currentPhoto={ this.state.filePathPhoto }
								setImage={ this.setImage }
								setTitle={ this.setTitle }
								{...props} />}
							/>
						</div>
					</div>

					<div className="col-md-9">

						<div className="panel-body">
							<Route render={(props) => <Photo filePath={ this.state.filePathPhoto } {...props}/> } />
						</div>
					</div>

				</div>

        );
    }
}




const app = document.getElementById("app");

ReactDOM.render(<BrowserRouter><Layout/></BrowserRouter>, app);
