import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];


class PostersAdd extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        token: this.props.cookies.get("token") || ""
    };

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async handleClick () {
        console.log('Submit!... ', this.state);
        const response = await fetch(`${config.api}/poster/add/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.state.token}`
            },
            body: JSON.stringify({
                name: this.state.name
            }) 
        });
        console.log(response);
        const responseJson = await response.json();
        this.props.history.push(`/posters/addImage/${responseJson._id}`); //Redirect

    }

    render() {
        return (
        <div>
            <h1>Add poster</h1>
            <form>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text"><input type="text" placeholder="Name" onChange={this.handleInputChange} name="name" placeholder="Name" /></p>
                        
                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Next</button>
                    </div>
                </div>
            </form>
        </div>
        )
        
      }

  }
export default withCookies(PostersAdd);