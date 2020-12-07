import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {

    componentDidMount() {
        console.log("Header monented")
    }

    render() {
        return(
            <div className="header">
                <h3>
                    <Link to="/">
                        Home
                    </Link>
                    |
                    <Link to="/owners">
                        Owner
                    </Link>
                    |
                    <Link to="/houses">
                        House
                    </Link>
                    |
                    <Link to="/customers">
                        Customer
                    </Link>
                    |
                    <Link to="/leases">
                        Lease
                    </Link>
                    |
                    {this.props.agent !== null && 
                    <span>
                        {this.props.agent.username}
                        |
                    </span>
                    }
                    <Link to="/login" onClick={this.props.logout}>{this.props.agent === null ? "Login" : "Logout"}</Link>
                </h3>
            </div>
        )
    }
}

export default Header;