import React, { Component } from 'react';
import { getAllLease, getAllByCustomerId, getAllByOwnerId, getAllClosed, getAllOnGoing, getAllClosing, addLease, getLeaseById } from '../services/LeaseService';
import { getCustomerById } from '../services/CustomerService';
import { getHouseById } from '../services/HouseService';
import { Link } from 'react-router-dom';

class Lease extends Component {

    state = {
        leases: [],
        lease: {
            actualRent: "",
            startDate: "",
            endDate: "",
            customer: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            },
            house: {
                id: "",
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
        },
        search: {
            searchLeaseId: "",
            searchOwnerId: "",
            searchCustomerId: ""
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

    searchById = () => {
        const id = this.state.search.searchLeaseId.trim();
        if(id === "") {
            alert("Id can't be empty!")
            return;
        }
        getLeaseById(id).then(response => {
            if(response.responseCode === 200) {
                const lease = response.responseObj;
                if(lease.startDate != null) {
                    let start = lease.startDate.split("T")[0];
                    lease.startDate = start;
                }
                if(lease.endDate != null) {
                    let end = lease.endDate.split("T")[0];
                    lease.endDate = end;
                }
                this.setState({
                    leases: [lease]
                })
            } else if(response.responseCode === 404) {
                this.setState({
                    leases: []
                })
            }
            alert(response.message);
        })
    }

    searchByOwnerId = () => {
        const id = this.state.search.searchOwnerId.trim();
        if(id === "") {
            alert("Owner id can't be empty!")
            return;
        }
        getAllByOwnerId(id).then(response => {
            if(response.responseCode === 200) {
                let leases = response.responseObj;
                leases = leases.map(lease => {
                    if(lease.startDate != null) {
                        let start = lease.startDate.split("T")[0];
                        lease.startDate = start;
                    }
                    if(lease.endDate != null) {
                        let end = lease.endDate.split("T")[0];
                        lease.endDate = end;
                    }
                    return lease;
                })
                this.setState({
                    leases: leases
                })
            } else if(response.responseCode === 404) {
                this.setState({
                    leases: []
                })
            }
            alert(response.message);
        })
    }

    searchByCustomerId = () => {
        const id = this.state.search.searchCustomerId.trim();
        if(id === "") {
            alert("Phone can't be empty!")
            return;
        }
        getAllByCustomerId(id).then(response => {
            if(response.responseCode === 200) {
                let leases = response.responseObj;
                leases = leases.map(lease => {
                    if(lease.startDate != null) {
                        let start = lease.startDate.split("T")[0];
                        lease.startDate = start;
                    }
                    if(lease.endDate != null) {
                        let end = lease.endDate.split("T")[0];
                        lease.endDate = end;
                    }
                    return lease;
                })
                this.setState({
                    leases: leases
                })
            } else if(response.responseCode === 404) {
                this.setState({
                    leases: []
                })
            }
            alert(response.message);
        })
    }

    searchClosed = () => {
        getAllClosed().then(response => {
            if(response.responseCode === 200) {
                let leases = response.responseObj;
                leases = leases.map(lease => {
                    if(lease.startDate != null) {
                        let start = lease.startDate.split("T")[0];
                        lease.startDate = start;
                    }
                    if(lease.endDate != null) {
                        let end = lease.endDate.split("T")[0];
                        lease.endDate = end;
                    }
                    return lease;
                })
                this.setState({
                    leases: leases
                })
            }
            alert(response.message);
        })
    }

    searchOnGoing = () => {
        getAllOnGoing().then(response => {
            if(response.responseCode === 200) {
                let leases = response.responseObj;
                leases = leases.map(lease => {
                    if(lease.startDate != null) {
                        let start = lease.startDate.split("T")[0];
                        lease.startDate = start;
                    }
                    if(lease.endDate != null) {
                        let end = lease.endDate.split("T")[0];
                        lease.endDate = end;
                    }
                    return lease;
                })
                this.setState({
                    leases: leases
                })
            }
            alert(response.message);
        })
    }

    searchClosing = () => {
        getAllClosing().then(response => {
            if(response.responseCode === 200) {
                let leases = response.responseObj;
                leases = leases.map(lease => {
                    if(lease.startDate != null) {
                        let start = lease.startDate.split("T")[0];
                        lease.startDate = start;
                    }
                    if(lease.endDate != null) {
                        let end = lease.endDate.split("T")[0];
                        lease.endDate = end;
                    }
                    return lease;
                })
                this.setState({
                    leases: leases
                })
            }
            alert(response.message);
        })
    }

    getAllLease = () => {
        getAllLease().then(response => {
            if(response.responseCode === 200) {
                let leases = response.responseObj;
                leases = leases.map(lease => {
                    if(lease.startDate != null) {
                        let start = lease.startDate.split("T")[0];
                        lease.startDate = start;
                    }
                    if(lease.endDate != null) {
                        let end = lease.endDate.split("T")[0];
                        lease.endDate = end;
                    }
                    return lease;
                })
                this.setState({
                    leases: leases
                })
            }
        })
    }

    getCustomer = () => {
        getCustomerById(this.state.lease.customer.id).then(response => {
            const lease = this.state.lease;
            if(response.responseCode === 200) {
                lease.customer = response.responseObj;
                this.setState({
                    lease: lease
                })
            } else {
                alert(response.message);
                lease.customer = {
                    id: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: ""
                }
                this.setState({
                    lease: lease
                })
            }
        })
    }

    getHouse = () => {
        getHouseById(this.state.lease.house.id).then(response => {
            const lease = this.state.lease;
            if(response.responseCode === 200) {
                lease.house = response.responseObj;
                this.setState({
                    lease: lease
                })
            } else {
                alert(response.message);
                lease.house = {
                    id: "",
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
                this.setState({
                    lease: lease
                })
            }
        })
    }

    addLease = () => {
        let lease = this.state.lease;
        console.log(lease)
        if(lease.customer.id.trim() === "") {
            alert("Customer id can't be empty!")
            return;
        }
        if(String(lease.house.id).trim() === "") {
            alert("House id can't be empty!")
            return;
        }
        lease.agent = {
            id: this.props.agent.id
        };
        addLease(lease).then(response => {
            if(response.responseCode === 200) {
                lease = response.responseObj;
                if(lease.startDate != null) {
                    let start = lease.startDate.split("T")[0];
                    lease.startDate = start;
                }
                if(lease.endDate != null) {
                    let end = lease.endDate.split("T")[0];
                    lease.endDate = end;
                }
                // this.setState({
                //     lease: lease
                // })
                this.getAllLease();
            }
            alert(response.message);
        })
    }

    onChangeHandler = (event, field) => {
        let lease = this.state.lease;
        let value = event.target.value;
        switch(field) {
            case "id":
                lease.id = value;
                break;
            case "actualRent":
                lease.actualRent = value;
                break;
            case "startDate":
                lease.startDate = value;
                break;
            case "endDate":
                lease.endDate = value;
                break;
            case "customerId":
                lease.customer.id = value;
                break;
            case "houseId":
                lease.house.id = value;
                break;
            default:
                console.log("No input field match.")
        }
        this.setState({
            lease: lease,
        })
    }

    componentDidMount() {
        this.getAllLease();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Lease Page</h1>
                    <div className="row margin-10 create">
                        <div className="col-5 pull-left">
                            <h4>Lease Section</h4>                        
                            <label htmlFor="actualRent">Rent: $</label>
                            <input id="actualRent" value={this.state.lease.actualRent} onChange={(event) => this.onChangeHandler(event, "actualRent")}/>
                            <br />
                            <label htmlFor="startDate">Start Date: </label>
                            <input id="startDate" type="date" value={this.state.lease.startDate} onChange={(event) => this.onChangeHandler(event, "startDate")}/>
                            <br />
                            <label htmlFor="endDate">End Date: </label>
                            <input id="endDate" type="date" value={this.state.lease.endDate} onChange={(event) => this.onChangeHandler(event, "endDate")}/>
                            <br />
                            <h4>Customer Section</h4>
                            <label htmlFor="customerId">Id: </label>
                            <input id="customerId" value={this.state.lease.customer.id} onChange={(event) => this.onChangeHandler(event, "customerId")}/>
                            <button onClick={this.getCustomer}>Search For Customer</button>
                            <br />
                            <label htmlFor="customerFirstName">First Name: </label>
                            <input id="customerFirstName" value={this.state.lease.customer.firstName} onChange={(event) => this.onChangeHandler(event, "customerFirstName")} disabled/>
                            <br />
                            <label htmlFor="customerLastName">Last Name: </label>
                            <input id="customerLastName" value={this.state.lease.customer.lastName} onChange={(event) => this.onChangeHandler(event, "customerLastName")} disabled/>
                            <br />
                            <label htmlFor="customerEmail">Email: </label>
                            <input id="customerEmail" value={this.state.lease.customer.email} onChange={(event) => this.onChangeHandler(event, "customerEmail")} disabled/>
                            <br />
                            <label htmlFor="customerPhone">Phone: </label>
                            <input id="customerPhone" value={this.state.lease.customer.phone} onChange={(event) => this.onChangeHandler(event, "customerPhone")} disabled/>
                        </div>
                        <div className="col-5 pull-left">
                            <h4>House Section</h4>
                            <label htmlFor="houseId">Id: </label>
                            <input id="houseId" value={this.state.lease.house.id} onChange={(event) => this.onChangeHandler(event, "houseId")}/>
                            <button onClick={this.getHouse}>Search For House</button>
                            <br />
                            <label htmlFor="rent">Rent: $</label>
                            <input id="rent" type="number" value={this.state.lease.house.rent} onChange={(event) => this.onChangeHandler(event, "rent")} disabled/>
                            <br />
                            <label htmlFor="street">Street:</label>
                            <input id="street" value={this.state.lease.house.street} onChange={(event) => this.onChangeHandler(event, "street")} disabled/>
                            <br />
                            <label htmlFor="city">City: </label>
                            <input id="city" value={this.state.lease.house.city.city} onChange={(event) => this.onChangeHandler(event, "city")} disabled/>
                            <br />
                            <label htmlFor="state">State: </label>
                            <input id="state" value={this.state.lease.house.city.state} onChange={(event) => this.onChangeHandler(event, "state")} disabled/>
                            <br />       
                            <label htmlFor="zipCode">Zip Code: </label>
                            <input id="zipCode" value={this.state.lease.house.city.zipCode} onChange={(event) => this.onChangeHandler(event, "zipCode")} disabled/>
                            <br />
                            <label htmlFor="ownerFirstName">First Name: </label>
                            <input id="ownerFirstName" value={this.state.lease.house.owner.firstName} onChange={(event) => this.onChangeHandler(event, "ownerFirstName")} disabled/>
                            <br />
                            <label htmlFor="ownerLastName">Last Name: </label>
                            <input id="ownerLastName" value={this.state.lease.house.owner.lastName} onChange={(event) => this.onChangeHandler(event, "ownerLastName")} disabled/>
                            <br />
                            <label htmlFor="ownerEmail">Email: </label>
                            <input id="ownerEmail" value={this.state.lease.house.owner.email} onChange={(event) => this.onChangeHandler(event, "ownerEmail")} disabled/>
                            <br />
                            <label htmlFor="ownerPhone">Phone: </label>
                            <input id="ownerPhone" value={this.state.lease.house.owner.phone} onChange={(event) => this.onChangeHandler(event, "ownerPhone")} disabled/>
                        </div>
                        <div className="col-2 pull-left">
                            <button onClick={this.addLease}>Create</button>
                        </div>
                    </div>
                    <hr />

                    <div className="margin-10 search">
                        <h4>Search Bar</h4>
                        <div className="row">
                            <div className="col-6">
                                <button onClick={this.searchClosed}>Search Closed</button>
                                <br />
                                <br />
                                <button onClick={this.searchOnGoing}>Search On Going</button>
                                <br />
                                <br />
                                <button onClick={this.searchClosing}>Closing in 2 months</button>
                                <br />
                                <br />
                                <button onClick={this.getAllLease}>Search All</button>
                            </div>
                            <div className="col-6">
                                <label htmlFor="searchLeaseId">Lease Id: </label>
                                <input id="searchLeaseId" value={this.state.search.searchLeaseId} onChange={(event) => this.searchInputHandler(event, "searchLeaseId")}/>
                                <button onClick={this.searchById}>Search</button>
                                <br />
                                <br />
                                <label htmlFor="searchOwnerId">Owner Id: </label>
                                <input id="searchOwnerId" value={this.state.search.searchOwnerId} onChange={(event) => this.searchInputHandler(event, "searchOwnerId")}/>
                                <button onClick={this.searchByOwnerId}>Search</button>
                                <br />
                                <br />
                                <label htmlFor="searchCustomerId">Customer Id: </label>
                                <input id="searchCustomerId" value={this.state.search.searchCustomerId} onChange={(event) => this.searchInputHandler(event, "searchCustomerId")}/>
                                <button onClick={this.searchByCustomerId}>Search</button>
                                <br />
                                <br />                                
                            </div>
                            
                        </div>
                    </div>

                    <h4>Showing: {this.state.leases.length} results</h4>
                    {this.state.leases.map(lease => 
                        <div className="row margin-10 result" key={lease.id}>
                            <div className="col-5 pull-left">
                                <h5>Id: {lease.id}</h5>
                                <h5>Customer: {lease.customer.firstName} {lease.customer.lastName}</h5>
                                <h5>Address: {lease.house.street}, {lease.house.city.city}, {lease.house.city.state}, {lease.house.city.zipCode}</h5>
                            </div>
                            <div className="col-5 pull-left">
                                <h5>Rent: ${lease.actualRent}</h5>
                                <h5>Start Date: {lease.startDate}</h5>
                                <h5>End Date: {lease.endDate}</h5>
                            </div>
                            <div className="col-2 pull-left">
                                <Link to={`/leases/${lease.id}`}>Edit</Link>
                            </div>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Lease;