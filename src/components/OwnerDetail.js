import React, { Component } from 'react';
import { getOwnerById, deleteOwnerById, hardDeleteOwnerById, updateOwner } from '../services/OwnerService';

class OwnerDetail extends Component {

    state = {
        owner: null
    }

    getOwnerById = (id) => {
        getOwnerById(id).then(response => {
            if(response.responseCode === 200) {
                const owner = response.responseObj;
                console.log(owner)
                this.setState({
                    owner: owner
                })
            }
        })
    }

    deleteOwnerById = () => {
        deleteOwnerById(this.state.owner.id).then(response => {
            if(response.responseCode === 200) {
                this.setState({
                    owner: null
                })
            }
            alert(response.message);
        })
    }

    hardDeleteOwnerById = () => {
        hardDeleteOwnerById(this.state.owner.id).then(response => {
            if(response.responseCode === 200) {
                this.setState({
                    owner: null
                })
            }
            alert(response.message);
        })
    }

    updateOwner = () => {
        const owner = this.state.owner;
        updateOwner(owner.id, owner).then(response => {
            if(response.responseCode === 200) {
                const owner = response.responseObj;
                this.setState({
                    owner: owner
                })
            }
            alert(response.message);
        })
    }

    onChangeHandler = (event, field) => {
        let owner = this.state.owner;
        let value = event.target.value;
        switch(field) {
            case "id":
                owner.id = value;
                break;
            case "firstName":
                owner.firstName = value;
                break;
            case "lastName":
                owner.lastName = value;
                break;
            case "email":
                owner.email = value;
                break;
            case "phone":
                owner.phone = value;
                break;
            default:
                console.log("No input field match.")
        }
        this.setState({
            owner: owner,
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getOwnerById(id);
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>OwnerDetail Page</h1>

                    {this.state.owner !== null && 
                        <div>
                            <div className="create margin-10">
                                <label htmlFor="id">Id: </label>
                                <input id="id" value={this.state.owner.id} onChange={(event) => this.onChangeHandler(event, "id")} disabled/>
                                <br />
                                <label htmlFor="firstName">Firset Name: </label>
                                <input id="firstName" value={this.state.owner.firstName} onChange={(event) => this.onChangeHandler(event, "firstName")}/>
                                <br />
                                <label htmlFor="lastName">Last Name: </label>
                                <input id="lastName" value={this.state.owner.lastName} onChange={(event) => this.onChangeHandler(event, "lastName")}/>
                                <br />
                                <label htmlFor="email">Email: </label>
                                <input id="email" value={this.state.owner.email} onChange={(event) => this.onChangeHandler(event, "email")}/>
                                <br />
                                <label htmlFor="phone">Phone: </label>
                                <input id="phone" value={this.state.owner.phone} onChange={(event) => this.onChangeHandler(event, "phone")}/>
                                <br />
                                <br />

                                
                                <button onClick={this.updateOwner}>Update</button>
                                &nbsp;
                                <button onClick={this.deleteOwnerById}>Delete</button>
                                &nbsp;
                                <button onClick={this.hardDeleteOwnerById}>HARD DELETE</button>
                            </div>
                            <hr />
                        </div>
                    }
                    {this.state.owner === null &&
                        <div>
                            <h1>This owner does not exist</h1>
                        </div>
                    }
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default OwnerDetail;