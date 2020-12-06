import React, { Component } from 'react';

class HouseDetail extends Component {

    state = {
        house: null
    }

    componentDidMount() {
        console.log("HouseDetail monented")
    }

    render() {
        return(
            
            this.props.agent !== null ? 
                <div>
                    <h1>HouseDetail Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default HouseDetail;