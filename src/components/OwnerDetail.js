import React, { Component } from 'react';

class OwnerDetail extends Component {

    state = {
        lease: null
    }

    componentDidMount() {
        console.log("OwnerDetail monented")
    }

    render() {
        return(
            
            this.props.agent !== null ? 
                <div>
                    <h1>OwnerDetail Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default OwnerDetail;