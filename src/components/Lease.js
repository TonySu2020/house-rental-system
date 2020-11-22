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
            <h1>Lease Page</h1>
        )
    }
}

export default Lease;