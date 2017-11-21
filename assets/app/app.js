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
			filePathPhoto: "",
			arrowKeysActive: true
		};

		this.setImage = this.setImage.bind(this);

		this.captureLeftRightKeys();
	}

	captureLeftRightKeys(){

		$(document).keyup(function(e){

			if(!this.state.arrowKeysActive) return;
			if(typeof this.photo === 'undefined' || this.photo == null) return;

			switch(e.which) {
				case 37: // left
				this.photo.prev();
				break;
				case 39: // right
				this.photo.next();
				break;
				default: return;
			}
			e.preventDefault();
			}.bind(this));
	}

	arrowKeysActive(b){
		this.setState({
			arrowKeysActive: b
		});
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

	imageSourceChanged(){
		console.log("Scroll top");
		$('#right').animate({ scrollTop: 0 }, 0);
	}

  render() {

      return (

	    <div className="row app-container">
	        <div className="col-sm-5" id="left" onClick={ () => { this.arrowKeysActive(false); } }>
						<div className="panel-body">

							<a href="javascript:;" onClick={ this.closeApp }>
								<div className="browser-directory"><i className="glyphicon glyphicon-remove"></i> <span className="folder-name">Close</span></div>
							</a>

							<MangaList ref={ m => { this.mangaList = m; } }/>
							<Add updateMangaList={ this.updateMangaList.bind(this) }/>
							<Route
								path={ Path.join(Url.mangaSpaUrl, ':name') }
								render={(props) => <Browser
								ref={ ref => (this.photo = ref) }
								currentPhoto={ this.state.filePathPhoto }
								setImage={ this.setImage }
								setTitle={ this.setTitle }
								{...props} />}
							/>


						</div>
	        </div>
	        <div className="col-sm-7" id="right" onClick={ () => { this.arrowKeysActive(true); } }>
						<div className="panel-body">

							<Route
							render={(props) =>
								<Photo
								filePath={ this.state.filePathPhoto }
								imageSourceChanged={ this.imageSourceChanged } {...props}
								/> } />

						</div>
	        </div>
	    </div>
        );
    }
}


const app = document.getElementById("app");

ReactDOM.render(<BrowserRouter><Layout/></BrowserRouter>, app);
