import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import $ from 'jquery';
import Manga from './manga';
import Add from './add';

class Layout extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			mangas: []
		};

		$.ajax({ url: '/manga' })
		.done(function(data){
			this.setState({ mangas: data });
		}.bind(this))
		.catch(function(err){
			console.log(err);
		});
	}

    render() {
        return(
				<div>
					<h2>漫画</h2>
					<div>
						<div className="row">
							<div className="col-md-6">
								{this.state.mangas.map(function(m){
									return (
									<Link to={ "/spa/manga/" + m.name } key={m.id}>
										<div><i className="glyphicon glyphicon-folder-open"></i> <span className="folder-name">{m.name}</span></div>
									</Link>
									)
								})}
							</div>
						</div>
						<div className="row">
							<Switch>
								<Route exact path="/spa" component={ Add }/>
								<Route path="/spa/manga/:name" component={ Manga }/>
							</Switch>
						</div>
					</div>
				</div>
        );
    }
}




const app = document.getElementById("app");

ReactDOM.render(<BrowserRouter><Layout/></BrowserRouter>, app);
