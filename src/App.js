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
import './App.css';

class App extends Component {

  state = {
    agent: null,
  }

  logout = () => {
    this.setState({
      agent: null,
    }, () => history.push("/login"))
  }

  updateAgent = (agent) => {
    this.setState({
      agent: agent
    })
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

              <Route path="/owners" render={(props) => 
                <Owner 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/customers" render={(props) => 
                <Customer 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/houses" render={(props) => 
                <House 
                  {...props}
                  agent = {this.state.agent}
                />
              }
              />

              <Route path="/leases" render={(props) => 
                <Lease 
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
