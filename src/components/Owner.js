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
            this.props.agent !== null ? 
                <div>
                    <h1>Owner Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Owner;