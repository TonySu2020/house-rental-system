import React, { Component } from 'react';
import { login } from '../services/AgentService';
import history from '../history';

class Login extends Component {

    state = {
        form: {
            username: "",
            password: "",
        }
    }

    login = () => {
        login(this.state.form).then(response => {
            if(response.responseCode === 200) {
                this.props.updateAgent(response.responseObj);
                history.push("/")
            };
            alert(response.message);
            
        })
    }

    onChangeHandler = (event, field) => {
        let form = this.state.form;
        switch(field) {
            case "username":
                form.username = event.target.value;
                break;
            case "password":
                form.password = event.target.value;
                break;
            default:
                console.log("No input field match.")
        }
        this.setState({
            form: form,
        })
    }

    render() {
        return(
            <div>
                <h1>Login Page</h1>
                <label htmlFor="username">username</label>
                <input id="username" onChange={(event) => this.onChangeHandler(event, "username")}/>
                <label htmlFor="password" >password</label>
                <input id="password" type="password" onChange={(event) => this.onChangeHandler(event, "password")}/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default Login;