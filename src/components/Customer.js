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
            
            this.props.agent !== null ? 
                <div>
                    <h1>Customer Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Customer;