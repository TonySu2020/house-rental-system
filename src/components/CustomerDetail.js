import React, { Component } from 'react';

class CustomerDetail extends Component {

    state = {
        customer: null
    }

    componentDidMount() {
        console.log("CustomerDetail monented")
    }

    render() {
        return(
            
            this.props.agent !== null ? 
                <div>
                    <h1>CustomerDetail Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default CustomerDetail;