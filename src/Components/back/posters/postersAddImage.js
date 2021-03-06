import React from 'react'
import {Link} from 'react-router-dom';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const env = process.env.NODE_ENV || 'production';
const config = require('../../../config/config.json')[env];


class postersAddImage extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        token: this.props.cookies.get("token") || "",
        image: null,
        poster: {},
        id: this.props.match.params.id
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
        const response = await fetch(`${config.api}/poster/addImage/`, {
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
        this.props.history.push('/posters/'); //Redirect
    }

    async componentDidMount() {
        const postersResponse = await fetch(`${config.api}/poster/${this.state.id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.state.token}`
            }
        });
        const posterJson = await postersResponse.json();
        console.log(posterJson);
        this.setState({ poster: posterJson }); 
    }

    filterBySize = (file) => {
        //filter out images larger than 5MB
        return file.size <= 5242880;
    };

    render() {
        return (
        <div>
            <h1>Add image</h1>
            <form>
                <div className="card">
                    <div className="card-body">
                        {this.state.poster.file_path &&
                            <div>
                                <p>Original imagen:</p>
                                <img src={`${this.state.poster.file_path}`}
                                alt="Original image" />
                            </div>
                        }

                        <h3>Change image</h3>
                        <Uploady
                            destination={{
                                headers: {"Authorization": `Bearer ${this.state.token}`},
                                url: `${config.api}/poster/addImage`,
                                sendWithFormData: true,
                                params: {
                                    id: this.state.id
                                }
                            }}
                            fileFilter={this.filterBySize}
                            accept="image/*">
                            <UploadButton />
                            <UploadPreview />   
                        </Uploady>                        
                    </div>
                </div>
            </form>
        </div>
        )
        
      }

  }
export default withCookies(postersAddImage);