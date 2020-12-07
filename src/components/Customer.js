import React, { Component } from 'react';
import { getAllCustomer, addCustomer} from '../services/CustomerService';
import { Link } from 'react-router-dom';

class Customer extends Component {

    state = {
        customers: [],
        customer: {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        }
    }

    getAllCustomer = () => {
        getAllCustomer().then(response => {
            if(response.responseCode === 200) {
                const customers = response.responseObj;
                this.setState({
                    customers: customers
                })
            }
        })
    }

    addCustomer = () => {
        if(this.state.customer.id === "") {
            alert("Id can't be empty!")
            return;
        }
        addCustomer(this.state.customer).then(response => {
            if(response.responseCode === 200) {
                this.getAllCustomer();
            }
        })
    }

    onChangeHandler = (event, field) => {
        let customer = this.state.customer;
        let value = event.target.value;
        switch(field) {
            case "id":
                customer.id = value.trim();
                break;
            case "firstName":
                customer.firstName = value.trim();
                break;
            case "lastName":
                customer.lastName = value.trim();
                break;
            case "email":
                customer.email = value.trim();
                break;
            case "phone":
                customer.phone = value.trim();
                break;
            default:
                console.log("No input field match.")
        }
        this.setState({
            customer: customer,
        })
    }

    componentDidMount() {
        this.getAllCustomer();
    }

    render() {
        return(
            this.props.agent !== null ? 
                <div>
                    <h1>Customer Page</h1>
                    <h2>New Customer</h2>
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="id">Id: </label>
                            <input id="id" value={this.state.customer.id} onChange={(event) => this.onChangeHandler(event, "id")}/>
                            <br />
                            <label htmlFor="firstName">Firset Name: </label>
                            <input id="firstName" value={this.state.customer.firstName} onChange={(event) => this.onChangeHandler(event, "firstName")}/>
                            <br />
                            <label htmlFor="lastName">Last Name: </label>
                            <input id="lastName" value={this.state.customer.lastName} onChange={(event) => this.onChangeHandler(event, "lastName")}/>
                            <br />
                        </div>
                        <div className="col-4">
                            <label htmlFor="email">Email: </label>
                            <input id="email" value={this.state.customer.email} onChange={(event) => this.onChangeHandler(event, "email")}/>
                            <br />
                            <label htmlFor="phone">Phone: </label>
                            <input id="phone" value={this.state.customer.phone} onChange={(event) => this.onChangeHandler(event, "phone")}/>
                        </div>
                        <div className="col-4">
                            <button onClick={this.addCustomer}>Create</button>
                        </div>
                        
                    </div>
                    <hr />
                    {this.state.customers.map(customer => 
                        <div className="row" key={customer.id}>
                            <div className="col-4">
                                <h5>Id: {customer.id}</h5>
                                <h5>Name: {customer.firstName} {customer.lastName}</h5>
                                
                            </div>
                            <div className="col-4">
                                <h5>Email: {customer.email}</h5>
                                <h5>Phone: {customer.phone}</h5>
                            </div>
                            <div className="col-4">
                                <Link to={`/customers/${customer.id}`}>Edit</Link>
                            </div>
                        </div>
                    )}
                </div>
                :
                <h1>Login to see this page</h1>
        )
    }
}

export default Customer;