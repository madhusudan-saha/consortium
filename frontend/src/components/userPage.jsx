import React, { Component } from 'react';

export default class UserPage extends Component {

    componentDidMount() {
	this.props.getTicketsRequests();
    }

    render() {
        return (
	    <div>
              <h3>Tickets</h3>
              <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                  <tr>
		    <th>Ticket No.</th>
		    <th>Destination</th>
                    <th>Date</th>
		    <th>Airlines</th>
                  </tr>
                </thead>
                <tbody>
                  { this.props.listTickets(this.props.props.username, this.props.props.page) }
                </tbody>
              </table>

	      <div className="form-inline">
		<label htmlFor="ticketNumber" className="col-form-label">Ticket number: </label>
		<input type="number" placeholder="Ticket number" id="ticketNumber" className="form-control" onChange={(text) => this.props.handleTicketNumber(text)} />
		  <label htmlFor="date" className="col-form-label">Date: </label>
		  <input type="date" placeholder="Date" id="date" className="form-control" onChange={(text) => this.props.handleDate(text)} />
		    <label htmlFor="reason" className="col-form-label">Reason: </label>
		    <input type="text" placeholder="Reason" id="reason" className="form-control" onChange={(text) => this.props.handleReason(text)} />
		      <button className="btn btn-primary btn-sm m-2" onClick={() => this.props.request(this.props.props.username, this.props.props.ticketNumber, this.props.props.date, this.props.props.reason)}>Request</button>
	      </div>
	      
	      <h3>Requests</h3>
              <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                  <tr>
		    <th>Destination</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount due</th>
                  </tr>
                </thead>
                <tbody>
                  { this.props.listRequests(this.props.props.username, this.props.props.page) }
                </tbody>
              </table>
	      
            </div>
        )
    }
}
