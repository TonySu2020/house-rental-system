import React, { Component } from 'react';
import { getLeaseById, deleteLeaseById, updateLease } from '../services/LeaseService';


class LeaseDetail extends Component {

    state = {
        lease: null
    }

    getLeaseById = (id) => {
        getLeaseById(id).then(response => {
            if(response.responseCode === 200) {
                const lease = response.responseObj;
                console.log(lease)
                this.setState({
                    lease: lease
                })
            }
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getLeaseById(id);
    }

    render() {
        return(
            
            this.props.agent !== null ? 
                <div>
                    {this.state.lease !== null &&
                    <div>
                        <div>
                            <h2>Lease Detail</h2>
                            <h5>Id: {this.state.lease.id}</h5>
                            <h5>Start Date: {this.state.lease.startDate}</h5>
                            <h5>End Date: {this.state.lease.endDate}</h5>
                            <h5>Rent: {this.state.lease.actualRent}</h5>
                        </div>
                        <div>
                            <h2>House Detail</h2>
                            <h5>Id: {this.state.lease.house.id}</h5>
                            <h5>Street: {this.state.lease.house.street}</h5>
                            <h5>City: {this.state.lease.house.city.city}</h5>
                            <h5>State: {this.state.lease.house.city.state}</h5>
                            <h5>Zip Code: {this.state.lease.house.city.zipCode}</h5>
                            <h5>Rent: ${this.state.lease.house.rent}</h5>
                            <h5>bathroomNumber: {this.state.lease.house.bathroomNumber}</h5>
                            <h5>bedroomNumber: {this.state.lease.house.bedroomNumber}</h5>
                            <h5>electricityInclude: {this.state.lease.house.electricityInclude ? "true" : "false"}</h5>
                            <h5>waterInclude: {this.state.lease.house.electricityInclude ? "true" : "false"}</h5>
                            <h5>gasInclude: {this.state.lease.house.gasInclude ? "true" : "false"}</h5>
                            <h5>nearToTransit: {this.state.lease.house.nearToTransit ? "true" : "false"}</h5>
                            <h5>networkInclude: {this.state.lease.house.networkInclude ? "true" : "false"}</h5>
                            <h5>Note: {this.state.lease.house.note}</h5>
                        </div>
                        <div>
                            <h2>Owner Detail</h2>
                            <h5>Id: {this.state.lease.house.owner.id}</h5>
                            <h5>First Name: {this.state.lease.house.owner.firstName}</h5>
                            <h5>Last Name: {this.state.lease.house.owner.lastName}</h5>
                            <h5>Email: {this.state.lease.house.owner.email}</h5>
                            <h5>Phone: {this.state.lease.house.owner.phone}</h5>
                        </div>
                        <div>
                            <h2>Customer Detail</h2>
                            <h5>Id: {this.state.lease.customer.id}</h5>
                            <h5>Firset Name: {this.state.lease.customer.firstName}</h5>
                            <h5>Last Name: {this.state.lease.customer.lastName}</h5>
                            <h5>Email: {this.state.lease.customer.email}</h5>
                            <h5>Phone: {this.state.lease.customer.phone}</h5>
                        </div>
                        <div>
                            <h2>Agent Detail</h2>
                            <h5>Id: {this.state.lease.agent.id}</h5>
                            <h5>Firset Name: {this.state.lease.agent.firstName}</h5>
                            <h5>Last Name: {this.state.lease.agent.lastName}</h5>
                            <h5>Email: {this.state.lease.agent.email}</h5>
                            <h5>Phone: {this.state.lease.agent.phone}</h5>
                        </div>
                    </div>
                    }
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default LeaseDetail;