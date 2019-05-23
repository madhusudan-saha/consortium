import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import NavBar from "./components/navbar";
import Register from "./components/register";
import UserPage from "./components/userPage";
import AirlinesPage from "./components/airlinesPage";
import Ticket from "./components/ticket";
import Request from "./components/request";

import axios from 'axios';

class App extends Component {

    state = {
	page: "Login",
	username: "",
	password: "",
	registerUserId: 0,
	registerUsername: "",
	registerPassword: "",
	registerAirlines: "",
	user: {},
	tickets: [],
	requests: [],
	ticketNumber: 0,
	date: "",
	reason: ""
    };

    getTicketsRequests = () => {
	axios.get('http://localhost:4000/ask/tickets')
	    .then(t => {
		this.setState({tickets: t.data});
		
		axios.get('http://localhost:4000/ask/requests')
		    .then(r => {
			this.setState({requests: r.data});
		    })
		    .catch(function (error){
			console.log(error);
		    })		
	    })
	    .catch(function (error){
                console.log(error);
	    })	
    }
    
    getRequests = () => {
	axios.get('http://localhost:4000/ask/requests')
	    .then(r => {
		this.setState({requests: r.data});
				
	    })
	    .catch(function (error){
                console.log(error);
	    })	
    }

    handleUsername = (text) => {
	this.setState({username: text.target.value})
    }
    
    handlePassword = (text) => {
	this.setState({password: text.target.value})
    }

    handleLogin = () => {
	let obj = {};
	obj.username = this.state.username;
	obj.password = this.state.password;

	axios({
	    method: 'post',
	    url: 'http://localhost:4000/ask/login',
	    data: obj,
	    config: { headers: {'Content-Type': 'application/json' }}
	})
	    .then(res => {
		const user = res.data;
		if(user.airlines === "yes") {
		    this.setState({page: "Airlines", user: res.data});
		}
		else if(user.airlines === "no") {
		    this.setState({page: "User", user: res.data});
		}		
	    })
	    .catch(function (error){
                console.log(error);
	    })
    }

    handleRegisterUserId = (text) => {
	this.setState({registerUserId: text.target.value})
    }

    handleRegisterUsername = (text) => {
	this.setState({registerUsername: text.target.value})
    }
    
    handleRegisterPassword = (text) => {
	this.setState({registerPassword: text.target.value})
    }

    handleRegisterAirlines = (text) => {
	this.setState({registerAirlines: text.target.value})
    }

    handleRegister = () => {
	let obj = {};
	obj.userId = this.state.registerUserId;
	obj.username = this.state.registerUsername;
	obj.password = this.state.registerPassword;
	obj.airlines = this.state.registerAirlines;

	axios({
	    method: 'post',
	    url: 'http://localhost:4000/ask/register_user',
	    data: obj,
	    config: { headers: {'Content-Type': 'application/json' }}
	})
	    .then(res => {
		this.setState({page: "Login"});
	    })
	    .catch(function (error){
                console.log(error);
	    })
    }

    handleUnregister = (username) => {
	let obj = {};
	obj.username = this.state.username;
	
	axios({
	    method: 'post',
	    url: 'http://localhost:4000/ask/unregister_user',
	    data: obj,
	    config: { headers: {'Content-Type': 'application/json' }}
	})
	    .then(res => {
		this.setState({page: "Login"});
	    })
	    .catch(function (error){
                console.log(error);
	    })
    }
    
    handlePageChange = (page) => {
	this.setState({page: page});
    }

    handleTicketNumber = (text) => {
	this.setState({ticketNumber: text.target.value});
    }

    handleDate = (text) => {
	this.setState({date: text.target.value});
    }

    handleReason = (text) => {
	this.setState({reason: text.target.value});
    }

    request = (username, ticketNumber, date, reason) => {
	let obj = {};
	obj.username = username;
	obj.ticketNumber = ticketNumber;
	obj.date = date;
	obj.reason = reason;
	
	axios({
	    method: 'post',
	    url: 'http://localhost:4000/ask/request',
	    data: obj,
	    config: { headers: {'Content-Type': 'application/json' }}
	})
	    .then(res => {
		this.setState({requests: res.data});
	    })
	    .catch(function (error){
                console.log(error);
	    })	
    }

    approveReject = (username, action, ticketNumber) => {
	let obj = {};
	obj.username = username;
	obj.action = action;
	obj.ticketNumber = ticketNumber;
	
	axios({
	    method: 'post',
	    url: 'http://localhost:4000/ask/approve_reject',
	    data: obj,
	    config: { headers: {'Content-Type': 'application/json' }}
	})
	    .then(res => {
		this.setState({requests: res.data});
	    })
	    .catch(function (error){
                console.log(error);
	    })		
    }
    
    listTickets = (username, page) => {
        return this.state.tickets.map(function(t, i) {
	    if(username === t.user) {
		return <Ticket
		page={page}
		ticket={t}
		key={i} />;
	    }
        })
    }

    listRequests = (username, page, approveReject) => {
        return this.state.requests.map(function(r, i) {
	    if((page === "User" && username === r.user) || (page === "Airlines" && username === r.airlines) || (page === "Airlines" && r.status === "Rejected")) {
		return <Request
		page={page}
		request={r}
		key={i}
		approveReject={approveReject}
		username={username} />;
	    }
        })
    }
    
    render() {	
	return (
		<main className="container">
		{(this.state.page === "User" || this.state.page === "Airlines") ? (<NavBar
										   props={this.state}
										   onPageChange={this.handlePageChange}
										   onUnregister={this.handleUnregister}
										   />) : null}
	    
	    {this.state.page === "Login" ? (<Login
					    props={this.state}
					    onUsernameChange={this.handleUsername}
					    onPasswordChange={this.handlePassword}
					    onLogin={this.handleLogin}
					    onPageChange={this.handlePageChange}
					    />) : null}
	    
	    {this.state.page === "Register" ? (<Register
					       props={this.state}
					       onRegisterUserIdChange={this.handleRegisterUserId}
					       onRegisterUsernameChange={this.handleRegisterUsername}
					       onRegisterPasswordChange={this.handleRegisterPassword}
					       onRegisterAirlinesChange={this.handleRegisterAirlines}
					       onRegister={this.handleRegister}
					       />) : null}
	    
	    {this.state.page === "User" ? (<UserPage
					   props={this.state}
					   handleTicketNumber={this.handleTicketNumber}
					   handleDate={this.handleDate}
					   handleReason={this.handleReason}
					   request={this.request}
					   listTickets={this.listTickets}
					   listRequests={this.listRequests}
					   getTicketsRequests={this.getTicketsRequests}
					   />) : null}
	    
	    {this.state.page === "Airlines" ? (<AirlinesPage
					       props={this.state}
					       approveReject={this.approveReject}
					       listRequests={this.listRequests}
					       getRequests={this.getRequests}
					       />) : null}
	    </main>
	);
    }
}

export default App;
