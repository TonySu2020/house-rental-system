import React, { Component } from 'react';
import { getOverview } from '../services/AnalysisService'

class Home extends Component {

    state = {
        numOfCustomer: 0,
        numOfOwner: 0,
        numOfCity: 0,
        numOfHouse: 0,
        numOfLease: 0,
    }

    componentDidMount() {
        getOverview().then(response => {
            if(response.responseCode === 200) {
                const summary = response.responseObj;
                this.setState({
                    numOfCustomer: summary.numOfCustomer,
                    numOfOwner: summary.numOfOwner,
                    numOfCity: summary.numOfCity,
                    numOfHouse: summary.numOfHouse,
                    numOfLease: summary.numOfLease,
                })
            }
        })
    }

    render() {

        const {numOfCustomer, numOfOwner, numOfCity, numOfHouse, numOfLease} = this.state;
        return(
            this.props.agent !== null ? 
                <div className="margin-10 create">
                    <h1>Home Page</h1>
                    <div className="home">
                    <h2>We have:</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Customer: </td>
                                    <td>{numOfCustomer}</td>
                                </tr>
                                <tr>
                                    <td>Owner: </td>
                                    <td>{numOfOwner}</td>
                                </tr>
                                <tr>
                                    <td>City: </td>
                                    <td>{numOfCity}</td>
                                </tr>
                                <tr>
                                    <td>House: </td>
                                    <td>{numOfHouse}</td>
                                </tr>
                                <tr>
                                    <td>Lease: </td>
                                    <td>{numOfLease}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Home;