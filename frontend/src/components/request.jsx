import React, { Component } from 'react';

class Request extends Component {
        
    render() {
	return (
	    <tr>
	      <td>{this.props.request.destination}</td>
	      <td>{this.props.request.date}</td>
	      <td>{this.props.request.status}</td>
	      <td>{this.props.request.amount}</td>
	      {this.props.page === "Airlines" && this.props.request.status !== "Approved" ? (<td><button onClick={() => this.props.approveReject(this.props.username, "Approved", this.props.request.ticketNumber)}>Approve</button><button onClick={() => this.props.approveReject(this.props.username, "Rejected", this.props.request.ticketNumber)}>Reject</button></td>) : null}
	    </tr>
	)
    }
}

export default Request;
