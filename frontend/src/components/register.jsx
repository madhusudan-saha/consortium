import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

export default class Register extends Component {
    
    render() {
        return (
	    <table>
	      <tbody>
		<tr>
		  <td><label htmlFor="userid" className="col-form-label">User ID: </label></td>
		  <td><input type="number" placeholder="User ID" id="userid" className="form-control" onChange={(text) => this.props.onRegisterUserIdChange(text)} /></td>
		</tr>		
		<tr>
		  <td><label htmlFor="username" className="col-form-label">Username: </label></td>
		  <td><input type="text" placeholder="Username" id="username" className="form-control" onChange={(text) => this.props.onRegisterUsernameChange(text)} /></td>
		</tr>
		<tr>
		  <td><label htmlFor="password" className="col-form-label">Password: </label></td>
		  <td><input type="password" placeholder="Password" id="password" className="form-control" onChange={(text) => this.props.onRegisterPasswordChange(text)} /></td>
		</tr>
		<tr>
		  <td><label htmlFor="airlines" className="col-form-label">Airlines? </label></td>
		  <td><input type="text" placeholder="yes/no" id="airlines" className="form-control" onChange={(text) => this.props.onRegisterAirlinesChange(text)} /></td>
		</tr>
		<tr>
		  <td><button className="btn btn-primary btn-sm m-2" onClick={() => this.props.onRegister()}>Register</button></td>
		</tr>
	      </tbody>
	    </table>
        )
    }
}
