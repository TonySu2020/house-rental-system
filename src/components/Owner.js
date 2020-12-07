import React, { Component } from 'react';
import { getAllOwner, addOwner } from '../services/OwnerService';
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
        }
    }

    getAllOwner = () => {
        getAllOwner().then(response => {
            if(response.responseCode === 200) {
                const owners = response.responseObj;
                console.log(owners)
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
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="id">Id: </label>
                            <input id="id" value={this.state.owner.id} onChange={(event) => this.onChangeHandler(event, "id")}/>
                            <br />
                            <label htmlFor="firstName">Firset Name: </label>
                            <input id="firstName" value={this.state.owner.firstName} onChange={(event) => this.onChangeHandler(event, "firstName")}/>
                            <br />
                            <label htmlFor="lastName">Last Name: </label>
                            <input id="lastName" value={this.state.owner.lastName} onChange={(event) => this.onChangeHandler(event, "lastName")}/>
                            <br />
                        </div>
                        <div className="col-4">
                            <label htmlFor="email">Email: </label>
                            <input id="email" value={this.state.owner.email} onChange={(event) => this.onChangeHandler(event, "email")}/>
                            <br />
                            <label htmlFor="phone">Phone: </label>
                            <input id="phone" value={this.state.owner.phone} onChange={(event) => this.onChangeHandler(event, "phone")}/>
                        </div>
                        <div className="col-4">
                            <button onClick={this.addOwner}>Create</button>
                        </div>
                    </div>
                    

                    {this.state.owners.map(owner => 
                        <div className="row" key={owner.id}>
                            <div className="col-4">
                                <h5>Id: {owner.id}</h5>
                                <h5>Name: {owner.firstName} {owner.lastName}</h5>
                                
                            </div>
                            <div className="col-4">
                                <h5>Email: {owner.email}</h5>
                                <h5>Phone: {owner.phone}</h5>
                            </div>
                            <div className="col-4">
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