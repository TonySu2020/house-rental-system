import React, { Component } from 'react';
import { getCustomerById, deleteCustomerById, updateCustomer } from '../services/CustomerService';
// import history from '../history';

class CustomerDetail extends Component {

    state = {
        customer: null
    }

    getCustomerById = (id) => {
        getCustomerById(id).then(response => {
            if(response.responseCode === 200) {
                const customer = response.responseObj;
                this.setState({
                    customer: customer
                })
            }
        })
    }

    deleteCustomer = () => {
        deleteCustomerById(this.state.customer.id).then(response => {
            if(response.responseCode === 200) {
                this.setState({
                    customer: null
                })
            }
            alert(response.message);
        })
    }

    updateCustomer = () => {
        const customer = this.state.customer;
        updateCustomer(customer.id, customer).then(response => {
            if(response.responseCode === 200) {
                const customer = response.responseObj;
                this.setState({
                    customer: customer
                })
            }
            alert(response.message);
        })
    }

    onChangeHandler = (event, field) => {
        let customer = this.state.customer;
        let value = event.target.value;
        switch(field) {
            case "id":
                customer.id = value;
                break;
            case "firstName":
                customer.firstName = value;
                break;
            case "lastName":
                customer.lastName = value;
                break;
            case "email":
                customer.email = value;
                break;
            case "phone":
                customer.phone = value;
                break;
            default:
                console.log("No input field match.")
        }
        this.setState({
            customer: customer,
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getCustomerById(id);
    }

    render() {
        
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>CustomerDetail Page</h1>
                    {this.state.customer !== null && 
                        <div>
                            <div className="create margin-10">
                                <label htmlFor="id">Id: </label>
                                <input id="id" value={this.state.customer.id} onChange={(event) => this.onChangeHandler(event, "id")} disabled/>
                                <br />
                                <label htmlFor="firstName">Firset Name: </label>
                                <input id="firstName" value={this.state.customer.firstName} onChange={(event) => this.onChangeHandler(event, "firstName")}/>
                                <br />
                                <label htmlFor="lastName">Last Name: </label>
                                <input id="lastName" value={this.state.customer.lastName} onChange={(event) => this.onChangeHandler(event, "lastName")}/>
                                <br />
                                <label htmlFor="email">Email: </label>
                                <input id="email" value={this.state.customer.email} onChange={(event) => this.onChangeHandler(event, "email")}/>
                                <br />
                                <label htmlFor="phone">Phone: </label>
                                <input id="phone" value={this.state.customer.phone} onChange={(event) => this.onChangeHandler(event, "phone")}/>
                                <br />
                                <br />

                                <button onClick={this.deleteCustomer}>Delete</button>
                                &nbsp;
                                <button onClick={this.updateCustomer}>Update</button>
                            </div>
                            <hr />
                        </div>
                        
                    }
                    {this.state.customer === null &&
                        <div>
                            <h1>This customer does not exist</h1>
                        </div>
                    }
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default CustomerDetail;