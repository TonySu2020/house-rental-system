import React, { Component } from 'react';
import { getAllOwner, getOwnerById, getOwnerByEmail, getOwnerByPhone,  addOwner } from '../services/OwnerService';
import { Link } from 'react-router-dom';


class Owner extends Component {

    state = {
        owners: [],
        owner: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        },
        search: {
            searchId: "",
            searchEmail: "",
            searchPhone: "",
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
        const id = this.state.search.searchId.trim();
        if(id === "") {
            alert("Id can't be empty!")
            return;
        }
        getOwnerById(id).then(response => {
            if(response.responseCode === 200) {
                const owner = response.responseObj;
                this.setState({
                    owners: [owner]
                })
            } else if(response.responseCode === 404) {
                this.setState({
                    owners: []
                })
            }
        })
    }

    searchByEmail = () => {
        const email = this.state.search.searchEmail.trim();
        if(email === "") {
            alert("Email can't be empty!")
            return;
        }
        getOwnerByEmail(email).then(response => {
            if(response.responseCode === 200) {
                const owners = response.responseObj;
                this.setState({
                    owners: owners
                })
            }
        })
    }

    searchByPhone = () => {
        const phone = this.state.search.searchPhone.trim();
        if(phone === "") {
            alert("Phone can't be empty!")
            return;
        }
        getOwnerByPhone(phone).then(response => {
            if(response.responseCode === 200) {
                const owners = response.responseObj;
                this.setState({
                    owners: owners
                })
            }
        })
    }

    getAllOwner = () => {
        getAllOwner().then(response => {
            if(response.responseCode === 200) {
                const owners = response.responseObj;
                this.setState({
                    owners: owners
                })
            }
        })
    }

    addOwner = () => {
        if(this.state.owner.id === "") {
            alert("Id can't be empty!")
            return;
        }
        addOwner(this.state.owner).then(response => {
            if(response.responseCode === 200) {
                this.getAllOwner();
            }
            alert(response.message);
        })
    }

    onChangeHandler = (event, field) => {
        let owner = this.state.owner;
        let value = event.target.value;
        switch(field) {
            case "id":
                owner.id = value.trim();
                break;
            case "firstName":
                owner.firstName = value.trim();
                break;
            case "lastName":
                owner.lastName = value.trim();
                break;
            case "email":
                owner.email = value.trim();
                break;
            case "phone":
                owner.phone = value.trim();
                break;
            default:
                console.log("No input field match.")
        }
        this.setState({
            owner: owner,
        })
    }

    componentDidMount() {
        this.getAllOwner();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Owner Page</h1>
                    <h2>New Customer</h2>
                    <div className="row margin-10 create">
                        <div className="col-5 pull-left">
                            <label htmlFor="id">Id: </label>
                            <input id="id" value={this.state.owner.id} onChange={(event) => this.onChangeHandler(event, "id")}/>
                            <br />
                            <label htmlFor="firstName">Firset Name: </label>
                            <input id="firstName" value={this.state.owner.firstName} onChange={(event) => this.onChangeHandler(event, "firstName")}/>
                            <br />
                            <label htmlFor="lastName">Last Name: </label>
                            <input id="lastName" value={this.state.owner.lastName} onChange={(event) => this.onChangeHandler(event, "lastName")}/>
                        </div>
                        <div className="col-5 pull-left">
                            <label htmlFor="email">Email: </label>
                            <input id="email" value={this.state.owner.email} onChange={(event) => this.onChangeHandler(event, "email")}/>
                            <br />
                            <label htmlFor="phone">Phone: </label>
                            <input id="phone" value={this.state.owner.phone} onChange={(event) => this.onChangeHandler(event, "phone")}/>
                        </div>
                        <div className="col-2 pull-left">
                            <button onClick={this.addOwner}>Create</button>
                        </div>
                    </div>
                    
                    <hr />

                    <div className="margin-10 search">
                        <h4>Search Bar</h4>
                        <div className="row">
                            <div className="col-4">
                                <label htmlFor="searchId">Id: </label>
                                <input id="searchId" value={this.state.search.searchId} onChange={(event) => this.searchInputHandler(event, "searchId")}/>
                                <button onClick={this.searchById}>Search</button>
                                <br />
                                <button onClick={this.getAllOwner}>Search All</button>
                            </div>
                            <div className="col-4">
                                <label htmlFor="searchEmail">Email: </label>
                                <input id="searchEmail" value={this.state.search.searchEmail} onChange={(event) => this.searchInputHandler(event, "searchEmail")}/>
                                <button onClick={this.searchByEmail}>Search</button>
                                <br />
                                <label htmlFor="searchPhone">Phone: </label>
                                <input id="searchPhone" value={this.state.search.searchPhone} onChange={(event) => this.searchInputHandler(event, "searchPhone")}/>
                                <button onClick={this.searchByPhone}>Search</button>
                            </div>
                            <div className="col-4">
                                
                            </div>
                        </div>
                    </div>

                    <h4>Showing: {this.state.owners.length} results</h4>
                    {this.state.owners.map(owner => 
                        <div className="row margin-10 result" key={owner.id}>
                            <div className="col-5 pull-left">
                                <h5>Id: {owner.id}</h5>
                                <h5>Name: {owner.firstName} {owner.lastName}</h5>
                            </div>
                            <div className="col-5 pull-left">
                                <h5>Email: {owner.email}</h5>
                                <h5>Phone: {owner.phone}</h5>
                            </div>
                            <div className="col-2 pull-left">
                                <Link to={`/owners/${owner.id}`}>Edit</Link>
                            </div>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Owner;