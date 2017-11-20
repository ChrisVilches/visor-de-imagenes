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

	closeApp(){
		$.ajax({
			url: '/close',
			success: function(res){
				$("#app").html("<p>Server is offline.</p>");
			}
		});
	}

	updateMangaList(){
		this.mangaList.fetchMangas();
	}

	scrollTop(){
		$('#right').animate({ scrollTop: 0 }, 0);
		console.log("scroll top")
	}

  render() {

      return (

	    <div className="row app-container">
	        <div className="col-sm-5" id="left">
						<div className="panel-body">

							<a href="javascript:;" onClick={ this.closeApp }>
								<div className="browser-directory"><i className="glyphicon glyphicon-remove"></i> <span className="folder-name">Close</span></div>
							</a>

							<MangaList ref={ m => { this.mangaList = m; } }/>
							<Add updateMangaList={ this.updateMangaList.bind(this) }/>
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
	        <div className="col-sm-7" id="right">
						<div className="panel-body">

							<Route render={(props) => <Photo filePath={ this.state.filePathPhoto } scrollTop={ this.scrollTop } {...props}/> } />

						</div>
	        </div>
	    </div>
        );
    }
}




const app = document.getElementById("app");

ReactDOM.render(<BrowserRouter><Layout/></BrowserRouter>, app);
