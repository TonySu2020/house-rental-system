import React, { Component } from 'react';

class Lease extends Component {

    state = {
        leases: []
    }

    componentDidMount() {
        console.log("Lease monented")
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Lease Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Lease;