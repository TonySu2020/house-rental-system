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
            this.props.agent !== null ? 
                <div>
                    <h1>House Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default House;