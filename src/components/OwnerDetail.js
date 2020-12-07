import React, { Component } from 'react';
import { getOwnerById, deleteOwnerById, updateOwner } from '../services/OwnerService';

class OwnerDetail extends Component {

    state = {
        owner: null
    }

    getOwnerById = (id) => {
        getOwnerById(id).then(response => {
            if(response.responseCode === 200) {
                const owner = response.responseObj;
                console.log(owner)
                this.setState({
                    owner: owner
                })
            }
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getOwnerById(id);
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>OwnerDetail Page</h1>
                    {this.state.owner !== null &&
                        <div>
                            <h5>Id: {this.state.owner.id}</h5>
                            <h5>First Name: {this.state.owner.firstName}</h5>
                            <h5>Last Name: {this.state.owner.lastName}</h5>
                            <h5>Email: {this.state.owner.email}</h5>
                            <h5>Phone: {this.state.owner.phone}</h5>
                        </div>
                    }
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default OwnerDetail;