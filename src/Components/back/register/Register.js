import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];

class Register extends React.Component {

    state = {
        registerMessage: '',
        registerStatus: false,
        pwdError: false
    };

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleCookie = (token) => {
        const { cookies } = this.props;
        cookies.set("token", token, { path: "/" });
    };
   
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async handleClick () {
        if(this.state.pwd!=this.state.pwd2){
            this.setState({
                pwdError: true
            });
        }

        const responseLogin = await fetch(`${config.api}/register/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: this.state.user,
                pwd: this.state.pwd
            }) 
        });
        const loginJson = await responseLogin.json();
 
        this.setState({
            registerMessage: loginJson.message
        });

        if(responseLogin.status===200){
            this.setState({
                registerStatus: true
            });

            this.handleCookie(loginJson.token);
        }
    }

   
    
    render() {    
        return (
            <div>
                {this.state.registerMessage !== '' &&
                <div className="alert alert-secondary" role="alert">
                    <p>{this.state.registerMessage}</p>
                </div>
                    
                }

                {this.state.registerStatus === true &&
                    <h3><Link to="/login/">Login</Link></h3>
                }
                <div className="form-group">
                    <div className="form-group">
                        <input type="text" name="user" onChange={this.handleInputChange} placeholder="User" />
                    </div>

                    <div className="form-group">
                        {this.state.pwdError === true &&
                        <div class="alert alert-danger">
                            <strong>Error!</strong> Passwords aren't are equal
                        </div>
                        }
                    </div>

                    <div className="form-group">
                        <input type="password" name="pwd" onChange={this.handleInputChange} placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <input type="password" name="pwd2" onChange={this.handleInputChange} placeholder="Re-entry password" />
                    </div>

                    
                </div>
                <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Register</button>
            </div>
        )
      }

  }
  export default Register;