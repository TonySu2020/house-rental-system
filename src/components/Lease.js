import React, { Component } from 'react';
import { getAllLease, getLeaseById, addLease, deleteLeaseById, updateLease } from '../services/LeaseService';

class Lease extends Component {

    state = {
        leases: []
    }

    getAllLease = () => {
        getAllLease().then(response => {
            if(response.responseCode === 200) {
                const leases = response.responseObj;
                console.log(leases)
                this.setState({
                    leases: leases
                })
            }
        })
    }

    componentDidMount() {
        this.getAllLease();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Lease Page</h1>
                    {this.state.leases.map(lease => 
                        <div>
                            <h5>Id: {lease.id}</h5>
                            <h5>Customer: {lease.customer.firstName} {lease.customer.lastName}</h5>
                            <h5>Address: {lease.house.street}, {lease.house.city.city}, {lease.house.city.state}, {lease.house.city.zipCode}</h5>
                            <h5>Start Date: {lease.startDate}</h5>
                            <h5>End Date: {lease.endDate}</h5>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Lease;