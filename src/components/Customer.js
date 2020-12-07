import React, { Component } from 'react';
import { getAllCustomer, getCustomerById, addCustomer, deleteCustomerById, updateCustomer } from '../services/CustomerService';

class Customer extends Component {

    state = {
        customers: []
    }

    getAllCustomer = () => {
        getAllCustomer().then(response => {
            if(response.responseCode === 200) {
                const customers = response.responseObj;
                console.log(customers)
                this.setState({
                    customers: customers
                })
            }
        })
    }

    componentDidMount() {
        this.getAllCustomer();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Customer Page</h1>
                    {this.state.customers.map(customer => 
                        <div key={customer.id}>
                            <h5>Id: {customer.id}</h5>
                            <h5>Name: {customer.firstName} {customer.lastName}</h5>
                            <h5>Email: {customer.email}</h5>
                            <h5>Phone: {customer.phone}</h5>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Customer;