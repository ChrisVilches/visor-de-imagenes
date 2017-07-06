import React from 'react';
import $ from 'jquery';

export default class Photo extends React.Component {

  constructor(props){
		super(props);
    this.state = {
      image: ""
    };
  }


	render() {
		return(
      <div>
        <img src={ this.state.image }/>
      </div>
		);
	}

}
