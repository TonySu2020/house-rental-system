import React, { Component } from 'react';
import { getAllOwner, getOwnerById, addOwner, deleteOwnerById, updateOwner } from '../services/OwnerService';

class Owner extends Component {

    state = {
        owners: []
    }

    getAllOwner = () => {
        getAllOwner().then(response => {
            if(response.responseCode === 200) {
                const owners = response.responseObj;
                console.log(owners)
                this.setState({
                    owners: owners
                })
            }
        })
    }

    componentDidMount() {
        this.getAllOwner();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Owner Page</h1>
                    {this.state.owners.map(owner => 
                        <div key={owner.id}>
                            <h5>Id: {owner.id}</h5>
                            <h5>Name: {owner.firstName} {owner.lastName}</h5>
                            <h5>Email: {owner.email}</h5>
                            <h5>Phone: {owner.phone}</h5>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Owner;