import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import {Redirect} from 'react-router-dom';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];

class PosterDelete extends React.Component {
    state = {
        poster: [],
        id: this.props.match.params.id,
    };

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
        this.setState({ poster: posterJson }); 
    }
  
    async handleClick () {
        console.log('Submit!... ', this.state);
        const response = await fetch(`${config.api}/poster/remove/${this.state.id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        console.log(response);
        this.props.history.push('/posters/'); //Redirect
    }

      render() {
        return (
            <div>
                <form>
                    {Object.keys(this.state.poster).length &&
                        <div className="card" key={this.state.poster._id}>
                        <div className="card-body">
                            <h1>{this.state.poster.name}</h1>
                            <p>Do you want to delete this poster?</p>
                            <button type="button" className="btn btn-danger" onClick={() => this.handleClick()}>Delete</button>
                        </div>
                        </div>
                    }
                </form>
          </div>
        )
        
      }

  }
  export default PosterDelete;