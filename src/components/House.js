import React, { Component } from 'react';
import { getAllHouse, getHouseById, addHouse, deleteHouseById, updateHouse } from '../services/HouseService';

class House extends Component {

    state = {
        houses: []
    }

    getAllHouse = () => {
        getAllHouse().then(response => {
            if(response.responseCode === 200) {
                const houses = response.responseObj;
                console.log(houses)
                this.setState({
                    houses: houses
                })
            }
        })
    }

    componentDidMount() {
        this.getAllHouse();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>House Page</h1>
                    {this.state.houses.map(house => 
                        <div key={house.id}>
                            <h5>Id: {house.id}</h5>
                            <h5>Address: {house.street}, {house.city.city}, {house.city.state}, {house.city.zipCode}</h5>
                            <h5>Rent: ${house.rent}</h5>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default House;