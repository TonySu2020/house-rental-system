import React, { Component } from 'react';
import { getAllCustomer, getCustomerByEmail, getCustomerByPhone, addCustomer, getCustomerById} from '../services/CustomerService';
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
        const id = this.state.search.searchId.trim()
        if(id === "") {
            alert("Id can't be empty!")
            return;
        }
        getCustomerById(id).then(response => {
            if(response.responseCode === 200) {
                const customer = response.responseObj;
                this.setState({
                    customers: [customer]
                })
            } else if(response.responseCode === 404) {
                this.setState({
                    customers: []
                })
            }
        })
    }

    searchByEmail = () => {
        const email = this.state.search.searchEmail.trim()
        if(email === "") {
            alert("Email can't be empty!")
            return;
        }
        getCustomerByEmail(email).then(response => {
            if(response.responseCode === 200) {
                const customers = response.responseObj;
                this.setState({
                    customers: customers
                })
            }
        })
    }

    searchByPhone = () => {
        const phone = this.state.search.searchPhone.trim()
        if(phone === "") {
            alert("Phone can't be empty!")
            return;
        }
        getCustomerByPhone(phone).then(response => {
            if(response.responseCode === 200) {
                const customers = response.responseObj;
                this.setState({
                    customers: customers
                })
            }
        })
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
                    <div className="row margin-10 create">
                        <div className="col-5 pull-left">
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
                        <div className="col-5 pull-left">
                            <label htmlFor="email">Email: </label>
                            <input id="email" value={this.state.customer.email} onChange={(event) => this.onChangeHandler(event, "email")}/>
                            <br />
                            <label htmlFor="phone">Phone: </label>
                            <input id="phone" value={this.state.customer.phone} onChange={(event) => this.onChangeHandler(event, "phone")}/>
                        </div>
                        <div className="col-2 pull-left">
                            <button onClick={this.addCustomer}>Create</button>
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
                                <button onClick={this.getAllCustomer}>Search All</button>
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
                    
                    <h4>Showing: {this.state.customers.length} results</h4>
                    {this.state.customers.map(customer => 
                        <div className="row margin-10 result" key={customer.id}>
                            <div className="col-5 pull-left">
                                <h5>Id: {customer.id}</h5>
                                <h5>Name: {customer.firstName} {customer.lastName}</h5>
                                
                            </div>
                            <div className="col-5 pull-left">
                                <h5>Email: {customer.email}</h5>
                                <h5>Phone: {customer.phone}</h5>
                            </div>
                            <div className="col-2 pull-left">
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