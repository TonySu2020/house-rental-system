import React, { Component } from 'react';
import { getHouseById, deleteHouseById, updateHouse } from '../services/HouseService';

class HouseDetail extends Component {

    state = {
        house: null
    }

    getHouseById = (id) => {
        getHouseById(id).then(response => {
            if(response.responseCode === 200) {
                const house = response.responseObj;
                console.log(house)
                this.setState({
                    house: house
                })
            }
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getHouseById(id);
    }

    render() {
        return(
            
            this.props.agent !== null ? 
                <div>
                    <h1>HouseDetail Page</h1>
                    {this.state.house !== null && 
                        <div>
                            <div>
                                <h2>House Detail</h2>
                                <h5>Id: {this.state.house.id}</h5>
                                <h5>Street: {this.state.house.street}</h5>
                                <h5>City: {this.state.house.city.city}</h5>
                                <h5>State: {this.state.house.city.state}</h5>
                                <h5>Zip Code: {this.state.house.city.zipCode}</h5>
                                <h5>Rent: ${this.state.house.rent}</h5>
                                <h5>bathroomNumber: {this.state.house.bathroomNumber}</h5>
                                <h5>bedroomNumber: {this.state.house.bedroomNumber}</h5>
                                <h5>electricityInclude: {this.state.house.electricityInclude ? "true" : "false"}</h5>
                                <h5>waterInclude: {this.state.house.electricityInclude ? "true" : "false"}</h5>
                                <h5>gasInclude: {this.state.house.gasInclude ? "true" : "false"}</h5>
                                <h5>nearToTransit: {this.state.house.nearToTransit ? "true" : "false"}</h5>
                                <h5>networkInclude: {this.state.house.networkInclude ? "true" : "false"}</h5>
                                <h5>Note: {this.state.house.note}</h5>
                            </div>
                            <div>
                                <h2>Owner Detail</h2>
                                <h5>Id: {this.state.house.owner.id}</h5>
                                <h5>First Name: {this.state.house.owner.firstName}</h5>
                                <h5>Last Name: {this.state.house.owner.lastName}</h5>
                                <h5>Email: {this.state.house.owner.email}</h5>
                                <h5>Phone: {this.state.house.owner.phone}</h5>
                            </div>
                        </div>
                    }
                    
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default HouseDetail;