import React, { Component } from 'react';
import { getHouseById, deleteHouseById, hardDeleteHouseById, updateHouse } from '../services/HouseService';

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

    deleteHouseById = () => {
        deleteHouseById(this.state.house.id).then(response => {
            if(response.responseCode === 200) {
                const house = response.responseObj;
                this.setState({
                    house: house
                })
            }
            alert(response.message);
        })
    }

    hardDeleteHouseById = () => {
        hardDeleteHouseById(this.state.house.id).then(response => {
            if(response.responseCode === 200) {
                const house = response.responseObj;
                this.setState({
                    house: house
                })
            }
            alert(response.message);
        })
    }

    updateHouse = () => {
        updateHouse(this.state.house.id, this.state.house).then(response => {
            if(response.responseCode === 200) {
                const house = response.responseObj;
                this.setState({
                    house: house
                })
            }
            alert(response.message);
        })
    }

    onChangeHandler = (event, field) => {
        let house = this.state.house;
        let value = event.target.value;
        switch(field) {
            case "id":
                house.id = value;
                break;
            case "street":
                house.street = value;
                break;
            case "city":
                house.city.city = value;
                break;
            case "state":
                house.city.state = value;
                break;
            case "zipCode":
                house.city.zipCode = value;
                break;
            case "rent":
                house.rent = Number(value);
                break;
            case "bathroomNumber":
                house.bathroomNumber = Number(value);
                break;
            case "bedroomNumber":
                house.bedroomNumber = Number(value);
                break;
            case "electricityInclude":
                house.electricityInclude = !house.electricityInclude;
                break;
            case "waterInclude":
                house.waterInclude = !house.waterInclude;
                break;
            case "gasInclude":
                house.gasInclude = !house.gasInclude;
                break;
            case "nearToTransit":
                house.nearToTransit = !house.nearToTransit;
                break;
            case "networkInclude":
                house.networkInclude = !house.networkInclude;
                break;
            case "note":
                house.note = value;
                break;
            case "ownerId":
                house.owner.id = value;
                break;
            case "firstName":
                house.owner.firstName = value;
                break;
            case "lastName":
                house.owner.lastName = value;
                break;
            case "email":
                house.owner.email = value;
                break;
            case "phone":
                house.owner.phone = value;
                break;
            default:
                console.log("No input field match.")
        }
        console.log(house);
        this.setState({
            house: house,
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
                            <h2>House Detail</h2>
                            <div className="row margin-10 create">
                                <div className="col-5 pull-left">
                                    <label htmlFor="id">Id:</label>
                                    <input id="id" value={this.state.house.id} onChange={(event) => this.onChangeHandler(event, "id")} disabled/>
                                    <br />
                                    <label htmlFor="street">Street:</label>
                                    <input id="street" value={this.state.house.street} onChange={(event) => this.onChangeHandler(event, "street")}/>
                                    <br />
                                    <label htmlFor="zipCode">Zip Code: </label>
                                    <input id="zipCode" value={this.state.house.city.zipCode} onChange={(event) => this.onChangeHandler(event, "zipCode")}/>
                                    <button onClick={this.getCity}>Search For City</button>
                                    <br />
                                    <label htmlFor="city">City: </label>
                                    <input id="city" value={this.state.house.city.city} onChange={(event) => this.onChangeHandler(event, "city")} disabled/>
                                    <br />
                                    <label htmlFor="state">State: </label>
                                    <input id="state" value={this.state.house.city.state} onChange={(event) => this.onChangeHandler(event, "state")} disabled/>
                                    <br />                            
                                    <label htmlFor="rent">Rent: $</label>
                                    <input id="rent" type="number" value={this.state.house.rent} onChange={(event) => this.onChangeHandler(event, "rent")}/>
                                    <br />
                                    <label htmlFor="bathroomNumber">bathroomNumber: </label>
                                    <input id="bathroomNumber" value={this.state.house.bathroomNumber} onChange={(event) => this.onChangeHandler(event, "bathroomNumber")}/>
                                    <br />
                                    <label htmlFor="bedroomNumber">bedroomNumber: </label>
                                    <input id="bedroomNumber" value={this.state.house.bedroomNumber} onChange={(event) => this.onChangeHandler(event, "bedroomNumber")}/>
                                </div>
                                <div className="col-6 pull-left">
                                    <h4>Include:</h4>
                                    <label htmlFor="electricityInclude">Electricity: </label>
                                    <input id="electricityInclude" type="checkbox" defaultChecked={this.state.house.electricityInclude} onChange={(event) => this.onChangeHandler(event, "electricityInclude")}/>
                                    <br />
                                    <label htmlFor="waterInclude">Water: </label>
                                    <input id="waterInclude" type="checkbox" defaultChecked={this.state.house.waterInclude} onChange={(event) => this.onChangeHandler(event, "waterInclude")}/>
                                    <br />
                                    <label htmlFor="gasInclude">Gas: </label>
                                    <input id="gasInclude" type="checkbox" defaultChecked={this.state.house.gasInclude} onChange={(event) => this.onChangeHandler(event, "gasInclude")}/>
                                    <br />
                                    <label htmlFor="networkInclude">Network: </label>
                                    <input id="networkInclude" type="checkbox" defaultChecked={this.state.house.networkInclude} onChange={(event) => this.onChangeHandler(event, "networkInclude")}/>
                                    <br />
                                    <label htmlFor="nearToTransit">NearToTransit: </label>
                                    <input id="nearToTransit" type="checkbox" defaultChecked={this.state.house.nearToTransit} onChange={(event) => this.onChangeHandler(event, "nearToTransit")}/>
                                    <br />
                                    <label htmlFor="note">Note: </label>
                                    <br />
                                    <textarea id="note" value={this.state.house.note} cols="30" onChange={(event) => this.onChangeHandler(event, "note")}/>
                                </div>
                            </div>
                            <br />
                            
                            <button onClick={this.updateHouse}>Update</button>
                            &nbsp;
                            <button onClick={this.deleteHouseById}>Delete</button>
                            &nbsp;
                            <button onClick={this.hardDeleteHouseById}>HARD DELETE</button>

                            <hr />
                            <div className="row margin-10 result">
                                <div className="col-6 pull-left">
                                    <h2>Owner Detail:</h2>
                                    <h5>Id: {this.state.house.owner.id}</h5>
                                    <h5>First Name: {this.state.house.owner.firstName}</h5>
                                    <h5>Last Name: {this.state.house.owner.lastName}</h5>
                                </div>
                                <div className="col-6 pull-left">
                                    <h2>Contact:</h2>
                                    <h5>Email: {this.state.house.owner.email}</h5>
                                    <h5>Phone: {this.state.house.owner.phone}</h5>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.house === null &&
                        <div>
                            <h1>This house does not exist</h1>
                        </div>
                    }
                    
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default HouseDetail;