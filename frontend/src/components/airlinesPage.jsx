import React, { Component } from 'react';

export default class AirlinesPage extends Component {

    componentDidMount() {
	this.props.getRequests();
    }

    render() {
        return (
	    <div>
	      <h3>Requests</h3>
              <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                  <tr>
		    <th>Destination</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount due</th>
		    <th>Approve</th>
                  </tr>
                </thead>
                <tbody>
		  { this.props.listRequests(this.props.props.username, this.props.props.page, this.props.approveReject) }
                </tbody>
              </table>
	      
            </div>
        )
    }
}
