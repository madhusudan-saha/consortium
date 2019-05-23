import React, { Component } from 'react';

class Ticket extends Component {
        
    render() {
	return (
	    <tr>
	      <td>{this.props.ticket.ticketNumber}</td>
	      <td>{this.props.ticket.destination}</td>
	      <td>{this.props.ticket.date}</td>
	      <td>{this.props.ticket.airlines}</td>
	    </tr>
	)
    }
}

export default Ticket;
