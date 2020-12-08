import React from 'react'
import {Link} from 'react-router-dom';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];


class PostersAdd extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        token: this.props.cookies.get("token") || "",
        image: null
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
        const response = await fetch(`${config.api}/posters/add/`, {
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
        this.props.history.push('/posters/list/'); //Redirect

    }

    filterBySize = (file) => {
        //filter out images larger than 5MB
        return file.size <= 5242880;
    };

    render() {
        return (
        <div>
            <form>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text"><input type="text" placeholder="Name" onChange={this.handleInputChange} name="name" placeholder="Name" /></p>

                        
                        <Uploady
                            destination={{ url: `${config.api}/posters/image/add/${this.state.id}` }}
                            fileFilter={this.filterBySize}
                            accept="image/*"
                        >
                            <UploadButton />
                            <UploadPreview />   
                        </Uploady>
                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Edit</button>
                    </div>
                </div>
            </form>
        </div>
        )
        
      }

  }
export default withCookies(PostersAdd);