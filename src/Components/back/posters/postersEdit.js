import React from 'react'
import {Link} from 'react-router-dom';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];


class PostersEdit extends React.Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    

    state = {
        token: this.props.cookies.get("token") || "",
        poster: {},
        id: this.props.match.params.id,
        image: null
    };

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }




    async componentDidMount() {
        //const postersResponse = await fetch(`${config.api}/posters/${this.state.id}`);
        const postersResponse = await fetch(`${config.api}/poster/${this.state.id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.state.token}`
            }
        });
        const posterJson = await postersResponse.json();
        this.setState({ poster: posterJson }); 
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
        const response = await fetch(`${config.api}/poster/update/${this.state.id}`, {
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
        //this.props.history.push('/posters/'); //Redirect
        this.props.history.push(`/posters/addImage/${this.state.id}`); //Redirect

    }

    filterBySize = (file) => {
        //filter out images larger than 5MB
        return file.size <= 5242880;
    };

    


    
    render() {
        const poster = this.state.poster;

        return (
        <div>
            {Object.keys(poster).length  &&
                <form>
                    <div className="card" key={poster._id}>
                    <div className="card-body">
                        <p className="card-text"><input type="text" defaultValue={poster.name} onChange={this.handleInputChange} name="name" placeholder="Name" /></p>

                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Next</button>
                    </div>
                    </div>
                </form>
           
            }

            
            {Object.keys(poster).length === 0 &&
                <h2>No such any poster.</h2>
            }
        </div>
        )
        
      }
  }
export default withCookies(PostersEdit);