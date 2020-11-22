import React, { Component } from 'react';

class House extends Component {

    state = {
        houses: []
    }

    componentDidMount() {
        console.log("House monented")
    }

    render() {
        return(
            <h1>House Page</h1>
        )
    }
}

export default House;