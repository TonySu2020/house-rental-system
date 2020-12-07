import React, { Component } from 'react';
import { getCustomerById, deleteCustomerById, updateCustomer } from '../services/CustomerService';

class CustomerDetail extends Component {

    state = {
        customer: null
    }

    getCustomerById = (id) => {
        getCustomerById(id).then(response => {
            if(response.responseCode === 200) {
                const customer = response.responseObj;
                console.log(customer)
                this.setState({
                    customer: customer
                })
            }
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getCustomerById(id);
    }

    render() {
        
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>CustomerDetail Page</h1>
                    {this.state.customer !== null && 
                        <div>
                            <h5>Id: {this.state.customer.id}</h5>
                            <h5>Firset Name: {this.state.customer.firstName}</h5>
                            <h5>Last Name: {this.state.customer.lastName}</h5>
                            <h5>Email: {this.state.customer.email}</h5>
                            <h5>Phone: {this.state.customer.phone}</h5>
                        </div>
                    }
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default CustomerDetail;