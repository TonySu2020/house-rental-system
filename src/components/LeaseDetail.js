import React, { Component } from 'react';
import { getLeaseById, deleteLeaseById, updateLease } from '../services/LeaseService';


class LeaseDetail extends Component {

    state = {
        lease: null
    }

    getLeaseById = (id) => {
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
                    lease: lease
                })
            }
        })
    }

    deleteLeaseById = () => {
        deleteLeaseById(this.state.lease.id).then(response => {
            if(response.responseCode === 200) {
                this.setState({
                    lease: null
                })
            }
            alert(response.message)
        })
    }

    updateLease = () => {
        let lease = this.state.lease;
        updateLease(this.state.lease.id, lease).then(response => {
            if(response.responseCode === 200) {
                lease = response.responseObj
                if(lease.startDate != null) {
                    let start = lease.startDate.split("T")[0];
                    lease.startDate = start;
                }
                if(lease.endDate != null) {
                    let end = lease.endDate.split("T")[0];
                    lease.endDate = end;
                }
                this.setState({
                    lease: lease
                })
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
                console.log(value)
                break;
            case "endDate":
                lease.endDate = value;
                break;
            default:
                console.log("No input field match.")
        }
        this.setState({
            lease: lease,
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getLeaseById(id);
    }

    render() {
        return(
            
            this.props.agent !== null ? 
                <div>
                    <h1>Lease Detail</h1>
                    {this.state.lease !== null &&
                    <div>
                        <div className="create margin-10">
                            <label htmlFor="id">Id: </label>
                            <input id="id" value={this.state.lease.id} onChange={(event) => this.onChangeHandler(event, "id")} disabled/>
                            <br />
                            <label htmlFor="actualRent">Rent: $</label>
                            <input id="actualRent" value={this.state.lease.actualRent} onChange={(event) => this.onChangeHandler(event, "actualRent")}/>
                            <br />
                            <label htmlFor="startDate">Start Date: </label>
                            <input id="startDate" type="date" value={this.state.lease.startDate} onChange={(event) => this.onChangeHandler(event, "startDate")}/>
                            <br />
                            <label htmlFor="endDate">End Date: </label>
                            <input id="endDate" type="date" value={this.state.lease.endDate} onChange={(event) => this.onChangeHandler(event, "endDate")}/>
                            <br />
                            <br />
                            <button onClick={this.deleteLeaseById}>Delete</button>
                            &nbsp;
                            <button onClick={this.updateLease}>Update</button>
                        </div>   
                        <hr />

                        <div className="row margin-10 result">
                            <div className="col-4 pull-left">
                                <h2>House Detail:</h2>
                                <h5>Id: {this.state.lease.house.id}</h5>
                                <h5>Street: {this.state.lease.house.street}</h5>
                                <h5>City: {this.state.lease.house.city.city}</h5>
                                <h5>State: {this.state.lease.house.city.state}</h5>
                                <h5>Zip Code: {this.state.lease.house.city.zipCode}</h5>
                                <h5>Rent: ${this.state.lease.house.rent}</h5>
                                <h5>Bedroom: {this.state.lease.house.bedroomNumber}</h5>
                                <h5>Bathroom: {this.state.lease.house.bathroomNumber}</h5>
                            </div>
                            <div className="col-4 pull-left">
                                <h2>Include:</h2>
                                <h5>Electricity: {this.state.lease.house.electricityInclude ? "TRUE" : "FALSE"}</h5>
                                <h5>Water: {this.state.lease.house.electricityInclude ? "TRUE" : "FALSE"}</h5>
                                <h5>Gas: {this.state.lease.house.gasInclude ? "TRUE" : "FALSE"}</h5>
                                <h5>Network: {this.state.lease.house.networkInclude ? "TRUE" : "FALSE"}</h5>
                                <h5>Near To Transit: {this.state.lease.house.nearToTransit ? "TRUE" : "FALSE"}</h5>
                            </div>
                            <div className="col-4 pull-left">
                                <h2>Note: </h2>
                                <h5>Note: {this.state.lease.house.note}</h5>
                            </div>
                        </div>

                        <div className="row margin-10 result">
                            <div className="col-6 pull-left">
                                <h2>Owner Detail: </h2>
                                <h5>Id: {this.state.lease.house.owner.id}</h5>
                                <h5>First Name: {this.state.lease.house.owner.firstName}</h5>
                                <h5>Last Name: {this.state.lease.house.owner.lastName}</h5>                                
                            </div>
                            <div className="col-6 pull-left">
                                <h2>Contacts: </h2>                        
                                <h5>Email: {this.state.lease.house.owner.email}</h5>
                                <h5>Phone: {this.state.lease.house.owner.phone}</h5>
                            </div>
                        </div>
                        <div className="row margin-10 result">
                            <div className="col-6 pull-left">
                                <h2>Customer Detail: </h2>
                                <h5>Id: {this.state.lease.customer.id}</h5>
                                <h5>Firset Name: {this.state.lease.customer.firstName}</h5>
                                <h5>Last Name: {this.state.lease.customer.lastName}</h5>
                            </div>
                            <div className="col-6 pull-left">
                                <h2>Contacts: </h2>
                                <h5>Email: {this.state.lease.customer.email}</h5>
                                <h5>Phone: {this.state.lease.customer.phone}</h5>
                            </div>
                        </div>
                        <div className="row margin-10 result">
                            <div className="col-6 pull-left">
                                <h2>Agent Detail: </h2>
                                <h5>Id: {this.state.lease.agent.id}</h5>
                                <h5>Firset Name: {this.state.lease.agent.firstName}</h5>
                                <h5>Last Name: {this.state.lease.agent.lastName}</h5>
                            </div>
                            <div className="col-6 pull-left">
                                <h2>Contacts: </h2>
                                <h5>Email: {this.state.lease.agent.email}</h5>
                                <h5>Phone: {this.state.lease.agent.phone}</h5>
                            </div>
                        </div>
                    </div>
                    }
                    {this.state.lease === null &&
                        <div>
                            <h1>This lease does not exist</h1>
                        </div>
                    }
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default LeaseDetail;