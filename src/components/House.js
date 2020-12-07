import React, { Component } from 'react';
import { getAllHouse, addHouse } from '../services/HouseService';
import { getOwnerById } from '../services/OwnerService';
import { getCityByZipCode } from '../services/ApiService';
import { Link } from 'react-router-dom';

class House extends Component {

    state = {
        houses: [],
        house: {
            bathroomNumber: "",
            bedroomNumber: "",
            electricityInclude: false,
            gasInclude: false,
            waterInclude: false,
            nearToTransit: false,
            networkInclude: false,
            note: "",
            rent: "",
            street: "",
            city: {
                city: "",
                state: "",
                zipCode: "",
            },
            owner:{
                id: "",
                email: "",
                firstName: "",
                lastName: "",
                phone: "",
            }

        }
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

    getCity = () => {
        getCityByZipCode(this.state.house.city.zipCode).then(response => {
            const house = this.state.house;
            if(response.city !== null && response.state !== null) {
                house.city.state = response.state;
                house.city.city = response.city;
                this.setState({
                    house: house
                })
            }
            console.log(response.error)
            if(response.error !== undefined) {
                alert("Invail ZipCode")
                house.city = {
                    city: "",
                    state: "",
                    zipCode: "",
                }
                this.setState({
                    house: house
                })
            }
        })
    }

    getOwner = () => {
        getOwnerById(this.state.house.owner.id).then(response => {
            const house = this.state.house;
            if(response.responseCode === 200) {
                const owner = response.responseObj;
                console.log(owner)
                house.owner = owner
                this.setState({
                    house: house
                })
            }
            else {
                alert(response.message);
                house.owner = {
                    id: "",
                    email: "",
                    firstName: "",
                    lastName: "",
                    phone: "",
                }
                this.setState({
                    house: house
                })
            }
        })
    }

    addHouse = () => {
        addHouse(this.state.house).then(response => {
            if(response.responseCode === 200) {
                this.getAllHouse();
            }
            alert(response.message);
        })
    }

    onChangeHandler = (event, field) => {
        let house = this.state.house;
        let value = event.target.value;
        switch(field) {
            case "id":
                house.id = value.trim();
                break;
            case "street":
                house.street = value.trim();
                break;
            case "city":
                house.city.city = value.trim();
                break;
            case "state":
                house.city.state = value.trim();
                break;
            case "zipCode":
                house.city.zipCode = value.trim();
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
                house.note = value.trim();
                break;
            case "ownerId":
                house.owner.id = value.trim();
                break;
            case "firstName":
                house.owner.firstName = value.trim();
                break;
            case "lastName":
                house.owner.lastName = value.trim();
                break;
            case "email":
                house.owner.email = value.trim();
                break;
            case "phone":
                house.owner.phone = value.trim();
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
        this.getAllHouse();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>House Page</h1>
                    <h2>New House</h2>
                    <div className="row">
                        <div className="col-4">
                            <h4>House Section</h4>
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
                            <br />
                            <label htmlFor="note">Note: </label>
                            <input id="note" value={this.state.house.note} onChange={(event) => this.onChangeHandler(event, "note")}/>

                        </div>
                        <div className="col-4">
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

                            <h4>Owner Section</h4>
                            {/* <label htmlFor=""></label>
                            <input id="" value={} onChange={(event) => this.onChangeHandler(event, )}/> */}

                            <label htmlFor="ownerId">Id: </label>
                            <input id="ownerId" value={this.state.house.owner.id} onChange={(event) => this.onChangeHandler(event, "ownerId")}/>
                            <button onClick={this.getOwner}>Search For Owner</button>
                            <br />
                            <label htmlFor="firstName">First Name: </label>
                            <input id="firstName" value={this.state.house.owner.firstName} onChange={(event) => this.onChangeHandler(event, "firstName")} disabled/>
                            <br />
                            <label htmlFor="lastName">Last Name: </label>
                            <input id="lastName" value={this.state.house.owner.lastName} onChange={(event) => this.onChangeHandler(event, "lastName")} disabled/>
                            <br />
                            <label htmlFor="email">Email: </label>
                            <input id="email" value={this.state.house.owner.email} onChange={(event) => this.onChangeHandler(event, "email")} disabled/>
                            <br />
                            <label htmlFor="phone">Phone: </label>
                            <input id="phone" value={this.state.house.owner.phone} onChange={(event) => this.onChangeHandler(event, "phone")} disabled/>

                        </div>
                        <div className="col-4">
                            <button onClick={this.addHouse}>Create</button>
                        </div>
                    </div>

                    {this.state.houses.map(house => 
                        <div className="row" key={house.id}>
                            <div className="col-6">
                                <h5>Id: {house.id}</h5>
                                <h5>Address: {house.street}, {house.city.city}, {house.city.state}, {house.city.zipCode}</h5>
                                <h5>Rent: ${house.rent}</h5>
                            </div>
                            <div className="col-6">
                                <Link to={`/houses/${house.id}`}>Edit</Link>
                            </div>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default House;