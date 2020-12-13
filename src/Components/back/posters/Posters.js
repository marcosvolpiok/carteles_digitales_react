import React from 'react'
import {Link} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];


class Posters extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state = {
        token: this.props.cookies.get("token") || "",
        posters: []
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const postersResponse = await fetch(`${config.api}/poster/list`,
        {
            method: 'GET',
            headers: {
              //'access-token': this.state.token
              'Authorization': `Bearer ${this.state.token}`
            }
        });
        const posterJson = await postersResponse.json();
        this.setState({ posters: posterJson }); 
    }
    
    render() {
        return (
        <div>
            <Link className="btn btn-primary" to="/posters/add" role="button">Add</Link>

            {this.state.posters.length > 0 &&
                <div>
                    <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.posters.map((poster) => (
                            <tr key={poster._id}>
                                <td>{poster.name}</td>
                                <td>
                                    <Link to={`/posters/edit/${poster._id}`}>Edit</Link> - 
                                    <Link to={`/poster/delete/${poster._id}`}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    </table>
                </div>
            }

            {this.state.posters.length === 0 &&
                <h2>No such any poster.</h2>
            }
        </div>
        )
        
      }

  }
export default withCookies(Posters);