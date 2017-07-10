import React from 'react';
import $ from 'jquery';

export default class Add extends React.Component {

  constructor(props){
		super(props);
  }

  submit(e){
    e.preventDefault();
    var name = $('#add-form-name').val().trim();
    var folder = $('#add-form-folder').val().trim();

    if(name.length == 0){
      console.error("Name missing");
      return;
    }

    if(folder.length == 0){
      console.error("Folder missing");
      return;
    }
    console.log("Adding:");
    console.log(name);
    console.log(folder);
  }

  openForm(e){
    e.preventDefault();
    $('#add-form').show();
    $('#add-form-open-btn').hide();

    /* Workaround to set all these attributes (you can't do this directly using JSX) */

    var attrs = [
      'webkitdirectory',
      'mozdirectory',
      'msdirectory',
      'odirectory',
      'directory',
      'multiple'
    ];

    for(var i in attrs){
      $('#add-form-folder').attr(attrs[i], '');
    }


  }

  cancel(e){
    e.preventDefault();
    $('#add-form')[0].reset();
    $('#add-form').hide();
    $('#add-form-open-btn').show();
  }

	render() {

    return (
      <div>
        <a href="javascript:;" onClick={ this.openForm } id="add-form-open-btn">
          <div className="browser-directory"><i className="glyphicon glyphicon-plus-sign"></i> <span className="folder-name"><i>New</i></span></div>
        </a>

        <form id="add-form" style={ { display: 'none' } }>

          <div className="form-group">
            <input className="form-control" type="text" placeholder="Name" id="add-form-name"/>
          </div>

          <div className="form-group">
            <input type="file" id="add-form-folder"/>
          </div>

          <button className="btn btn-primary" onClick={ this.submit }>Ok</button> <a href="javascript:;" onClick={ this.cancel }>Cancel</a>
        </form>

      </div>
    );
	}

}
