import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
    state = {
	displayMenu: false
    };

    showDropdownMenu = (event) => {
	event.preventDefault();
	this.setState({ displayMenu: true }, () => {
	    document.addEventListener('click', this.hideDropdownMenu);
	});
    }

    hideDropdownMenu = () => {
	this.setState({ displayMenu: false }, () => {
	    document.removeEventListener('click', this.hideDropdownMenu);
	});	
    }
    
    render() {
	return (
	    <nav className="navbar navbar-expand-lg navbar-light bg-light">
	      <a className="navbar-brand" href="#">ASK</a>
	      <div className="collapse navbar-collapse">
		<div className="navbar-nav nav ml-auto">
		  <div className="dropdown">
		    <a className="nav-link dropdown-toggle" onClick={this.showDropdownMenu} href="#">{this.props.props.username}</a>
		    { this.state.displayMenu ? (
			<ul>
			  <li className="nav-link dropdown-item"><a onClick={() => this.props.onUnregister(this.props.props.username)} href="#">Unregister</a></li>
			  <li className="nav-link dropdown-item"><a onClick={() => this.props.onPageChange("Login")} href="#">Logout</a></li>
			</ul>
		    ) : (null)}
	    </div>
		</div>
		</div>
		</nav>	
	);
    }
};

export default NavBar;
