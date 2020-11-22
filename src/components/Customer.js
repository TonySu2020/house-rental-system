import React, { Component } from 'react';

class Customer extends Component {

    state = {
        customers: []
    }

    componentDidMount() {
        console.log("Customer monented")
    }

    render() {
        return(
            <h1>Customer Page</h1>
        )
    }
}

export default Customer;