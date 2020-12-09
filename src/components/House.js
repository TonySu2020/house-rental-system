import React, { Component } from 'react';
import { getAllHouse, addHouse, getAllByCondition, getAllByOwnerId } from '../services/HouseService';
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

        },
        search: {
            searchOwnerId: "",

            searchZip: "",
            searchBed: "",
            searchBath: "",
            searchMin: "",
            searchMax: "",

            searchElectricity: false,
            searchWater: false,
            searchGas: false,
            searchNetwork: false,
            searchNearToTransit: false,
        }
    }

    searchInputHandler = (event, field) => {
        let search = this.state.search;
        let value = event.target.value;
        search[field] = value;
        this.setState({
            search: search
        })
    }

    seachCheckBoxHandler = (field) => {
        let search = this.state.search;
        search[field] = !search[field]
        this.setState({
            search: search
        })
    }

    searchByOwnerId = () => {
        const id = this.state.search.searchOwnerId.trim();
        if(id === "") {
            alert("Id can't be empty!")
            return;
        }
        getAllByOwnerId(id).then(response => {
            if(response.responseCode === 200) {
                const houses = response.responseObj;
                this.setState({
                    houses: houses
                })
            }
            alert(response.message);
        })
    }

    searchByCondition = () => {
        const search = this.state.search;
        let zip = search.searchZip
        let bed = search.searchBed
        let bath = search.searchBath
        let min = search.searchMin
        let max = search.searchMax
        let ele = search.searchElectricity
        let water = search.searchWater
        let gas = search.searchGas
        let net = search.searchNetwork
        let transit = search.searchNearToTransit
        if(zip.trim() === "") {
            alert("ZipCode can't be empty!")
            return
        }
        zip = zip.trim();
        if(bed === "") {
            alert("Number of bedroom can't be empty!")
            return
        }
        bed = Math.ceil(bed)
        if(bath === "") {
            alert("Number of bathroom can't be empty!")
            return
        }
        bath = Math.ceil(bath)
        if(min === "") {
            alert("Minimum can't be empty!")
            return
        }
        if(max === "") {
            alert("Maximum can't be empty!")
            return
        }
        getAllByCondition(zip, bed, bath, min, max, ele, water, gas, net, transit).then(response => {
            if(response.responseCode === 200) {
                const houses = response.responseObj;
                this.setState({
                    houses: houses
                })
            }
            alert(response.message)
        })

    }

    getAllHouse = () => {
        getAllHouse().then(response => {
            if(response.responseCode === 200) {
                const houses = response.responseObj;
                this.setState({
                    houses: houses
                })
            }
        })
    }

    getCity = () => {
        let zipCode = this.state.house.city.zipCode.trim();
        if(zipCode === "") {
            alert("Zip code can't be empty!");
            return;
        }
        getCityByZipCode(zipCode).then(response => {
            const house = this.state.house;
            if(response.city !== null && response.state !== null) {
                house.city.state = response.state;
                house.city.city = response.city;
                this.setState({
                    house: house
                })
            }
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
        let house = this.state.house;
        if(house.owner.id.trim() === "") {
            alert("Owner id can't be empty!");
            return;
        }
        getOwnerById(house.owner.id).then(response => {
            house = this.state.house;
            if(response.responseCode === 200) {
                const owner = response.responseObj;
                house.owner = owner
                this.setState({
                    house: house
                })
            } else {
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
        let house = this.state.house;
        if(house.city.zipCode.trim() === "") {
            alert("Zip code can't be empty!");
            return;
        }
        if(house.owner.id.trim() === "") {
            alert("Owner id can't be empty!");
            return;
        }
        getCityByZipCode(house.city.zipCode.trim()).then(response => {
            if(response.error !== undefined) {
                alert("Invail zipcode!");
                return;
            }
            if(response.city === house.city.city && response.state === house.city.state) {
                addHouse(house).then(response => {
                    if(response.responseCode === 200) {
                        this.getAllHouse();
                    }
                    alert(response.message);
                })
            } else {
                alert("Zipcode doesn't match the city!");
            }
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
                    <div className="row margin-10 create">
                        <div className="col-5 pull-left">
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
                            <label htmlFor="bedroomNumber">Bedroom: </label>
                            <input id="bedroomNumber" type="number" value={this.state.house.bedroomNumber} onChange={(event) => this.onChangeHandler(event, "bedroomNumber")}/>
                            <br />
                            <label htmlFor="bathroomNumber">Bathroom: </label>
                            <input id="bathroomNumber" type="number" value={this.state.house.bathroomNumber} onChange={(event) => this.onChangeHandler(event, "bathroomNumber")}/>
                            <br />                            
                            <label htmlFor="note">Note: </label>
                            <br />
                            <textarea id="note" value={this.state.house.note} cols="30" onChange={(event) => this.onChangeHandler(event, "note")}/>
                        </div>
                        <div className="col-5 pull-left">
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
                        <div className="col-2 pull-left">
                            <button onClick={this.addHouse}>Create</button>
                        </div>
                    </div>
                    <hr />
                    
                    <div className="margin-10 search">
                        <h4>Search Bar</h4>
                        <div className="row">
                            <div className="col-4 pull-left">
                                <label htmlFor="searchZip">ZipCode: </label>
                                <input id="searchZip" value={this.state.search.searchZip} onChange={(event) => this.searchInputHandler(event, "searchZip")}/>
                                <br />
                                <label htmlFor="searchBed">Bedroom: </label>
                                <input id="searchBed" type="number" value={this.state.search.searchBed} onChange={(event) => this.searchInputHandler(event, "searchBed")}/>
                                <br />
                                <label htmlFor="searchBath">Bathroom: </label>
                                <input id="searchBath" type="number" value={this.state.search.searchBath} onChange={(event) => this.searchInputHandler(event, "searchBath")}/>
                                <br />
                                <label htmlFor="searchMin">Minimum: $</label>
                                <input id="searchMin" type="number" value={this.state.search.searchMin} onChange={(event) => this.searchInputHandler(event, "searchMin")}/>
                                <br />
                                <label htmlFor="searchMax">Maximum: $</label>
                                <input id="searchMax" type="number" value={this.state.search.searchMax} onChange={(event) => this.searchInputHandler(event, "searchMax")}/>
                                <br />
                                <button onClick={this.getAllHouse}>Search All</button>
                                &nbsp;
                                <button onClick={this.searchByCondition}>Search</button>
                            </div>
                            <div className="col-4 pull-left">
                                <label htmlFor="searchElectricity">Electricity: </label>
                                <input id="searchElectricity" type="checkbox" defaultChecked={this.state.search.searchElectricity} onChange={() => this.seachCheckBoxHandler("searchElectricity")}/>
                                <br />
                                <label htmlFor="searchWater">Water: </label>
                                <input id="searchWater" type="checkbox" defaultChecked={this.state.search.searchWater} onChange={() => this.seachCheckBoxHandler("searchWater")}/>
                                <br />
                                <label htmlFor="searchGas">Gas: </label>
                                <input id="searchGas" type="checkbox" defaultChecked={this.state.search.searchGas} onChange={() => this.seachCheckBoxHandler("searchGas")}/>
                                <br />
                                <label htmlFor="searchNetwork">Network: </label>
                                <input id="searchNetwork" type="checkbox" defaultChecked={this.state.search.searchNetwork} onChange={() => this.seachCheckBoxHandler("searchNetwork")}/>
                                <br />
                                <label htmlFor="searchNearToTransit">NearToTransit: </label>
                                <input id="searchNearToTransit" type="checkbox" defaultChecked={this.state.search.searchNearToTransit} onChange={() => this.seachCheckBoxHandler("searchNearToTransit")}/>
                                <br />
                                
                            </div>
                            <div className="col-4 pull-left">
                                <label htmlFor="searchOwnerId">Owner Id: </label>
                                <input id="searchOwnerId" value={this.state.search.searchOwnerId} onChange={(event) => this.searchInputHandler(event, "searchOwnerId")}/>
                                <button onClick={this.searchByOwnerId}>Search</button>
                                <br />
                            </div>
                        </div>
                    </div>

                    <h4>Showing: {this.state.houses.length} results</h4>
                    {this.state.houses.map(house => 
                        <div className="row margin-10 result" key={house.id}>
                            <div className="col-6 pull-left">
                                <h5>Id: {house.id}</h5>
                                <h5>Address: {house.street}, {house.city.city}, {house.city.state}, {house.city.zipCode}</h5>
                                <h5>Rent: ${house.rent}</h5>
                            </div>
                            <div className="col-6 pull-left">
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