import React, { Component } from 'react';

class Owner extends Component {

    state = {
        owners: []
    }

    componentDidMount() {
        console.log("Owner monented")
    }

    render() {
        return(
            <h1>Owner Page</h1>
        )
    }
}

export default Owner;