import React, { Component } from 'react';

class Home extends Component {

    componentDidMount() {
        console.log("Home monented")
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Home Page</h1>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Home;