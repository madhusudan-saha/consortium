import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

export default class RequestPage extends Component {
    
    render() {
        return (
	    <table>
	      <tbody>
		<tr>
		  <td><label htmlFor="username" className="col-form-label">Username: </label></td>
		  <td><input type="text" placeholder="Username" id="username" className="form-control" onChange={(text) => this.props.onUnregisterUsernameChange(text)} /></td>
		</tr>
		<tr>
		  <td><button className="btn btn-primary btn-sm m-2" onClick={() => this.props.onUnregister()}>Unregister</button></td>
		</tr>
	      </tbody>
	    </table>
        )
    }
}
