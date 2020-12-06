import React, { Component } from 'react';

class LeaseDetail extends Component {

    state = {
        lease: null
    }

    componentDidMount() {
        console.log("LeaseDetail monented")
    }

    render() {
        return(
            
            this.props.agent !== null ? 
                <div>
                    <h1>LeaseDetail Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default LeaseDetail;