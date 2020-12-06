import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Header from './components/Header';
import Home from './components/Home';
import Customer from './components/Customer';
import Owner from './components/Owner';
import House from './components/House';
import Lease from './components/Lease';
import Login from './components/Login';
import Register from './components/Register';
import CustomerDetail from './components/CustomerDetail';
import OwnerDetail from './components/OwnerDetail';
import HouseDetail from './components/HouseDetail';
import LeaseDetail from './components/LeaseDetail';

import './App.css';

class App extends Component {

  state = {
    agent: null,
  }

  logout = () => {
    localStorage.removeItem("agent");
    this.setState({
      agent: null,
    }, () => history.push("/login"))
  }

  updateAgent = (agent) => {
    localStorage.setItem("agent", JSON.stringify(agent))
    console.log(JSON.parse(localStorage.getItem("agent")))
    this.setState({
      agent: agent
    })
  }

  componentDidMount() {
    let agent = localStorage.getItem("agent");
    if(agent !== null) {
      this.setState({
        agent: JSON.parse(agent)
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Router history = {history}>
            <Header 
              agent = {this.state.agent}
              logout = {this.logout}
            />
            <Switch>
              <Route path="/" exact render={(props) => 
                <Home 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />
              <Route path="/login" render={(props) => 
                <Login 
                  {...props}
                  updateAgent = {this.updateAgent}
                />
              }
              />

              <Route path="/register" render={(props) => 
                <Register 
                  {...props}
                />
              }
              />

              <Route path="/owners" exact render={(props) => 
                <Owner 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/owners/:id" render={(props) => 
                <OwnerDetail 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/customers" exact render={(props) => 
                <Customer 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/customers/:id" render={(props) => 
                <CustomerDetail
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/houses" exact render={(props) => 
                <House 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/houses/:id" render={(props) => 
                <HouseDetail
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/leases" exact render={(props) => 
                <Lease 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/leases/:id" render={(props) => 
                <LeaseDetail
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />
            </Switch>
          </Router>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
