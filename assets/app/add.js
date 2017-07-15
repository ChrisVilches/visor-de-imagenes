import React from 'react';
import $ from 'jquery';
import Url from './url';

export default class Add extends React.Component {

  constructor(props){
		super(props);
  }

  submit(e){
    e.preventDefault();
    var name = $('#add-form-name').val().trim();
    var path = $('#add-form-path').val().trim();

    if(name.length == 0){
      $('#add-form-error-msg').html('Name missing');
      return;
    }

    if(path.length == 0){
      $('#add-form-error-msg').html('Path missing');
      return;
    }

    $.ajax({

      url: Url.mangaServiceUrl,
      method: 'POST',
      data: {
        name: name,
        path: path
      },
      success: function(data){
        this.cancel();
        this.props.updateMangaList();

      }.bind(this),
      error: function(err){

        var error = 'Unknown error';
        if(typeof err.responseJSON === 'string'){
          error = err.responseJSON;
        } else if(typeof err.responseJSON.message === 'string') {
          error = err.responseJSON.message;
        }
                
        $('#add-form-error-msg').html(error);
      }
    });
  }

  openForm(e){
    e.preventDefault();
    $('#add-form').show();
    $('#add-form-open-btn').hide();
  }

  cancel(e = null){
    if(e)
      e.preventDefault();
    $('#add-form')[0].reset();
    $('#add-form').hide();
    $('#add-form-open-btn').show();
    $('#add-form-error-msg').html('');
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
            <input className="form-control" type="text" placeholder="Path" id="add-form-path"/>
          </div>

          <div className="alert alert-danger" id="add-form-error-msg"></div>

          <button className="btn btn-primary" onClick={ this.submit.bind(this) }>Ok</button> <a href="javascript:;" onClick={ this.cancel }>Cancel</a>
        </form>

      </div>
    );
	}

}
