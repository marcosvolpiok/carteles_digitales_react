import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
const io = require('socket.io-client');
//import 'bootstrap/dist/css/bootstrap.min.css';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];

class PosterWatch extends React.Component {
    constructor(props) {
        super(props);
        //this.socket = io();
        this.socket =io("http://localhost:3050", {
           // reconnectionDelayMax: 1,
            
        });
        this.connectSocket();
    }

    
    state = {
        id: this.props.match.params.id
    };


    connectSocket(){
        this.socket.on('action', function(){
            console.log('llegó msg action');
            this.searchPosters();
        }.bind(this));
    }

    handleClick(action) {
        console.log('cambiando accion... ', 'xxxxxx');
        this.socket.emit('action', 'xxxxx'); 
    }

    async componentDidMount() {
        this.searchPosters();
    }

    async searchPosters(){
        const postersResponse = await fetch(`${config.api}/poster/listByUserId/${this.state.id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': `Bearer ${this.state.token}`
            }
        });
        const posterJson = await postersResponse.json();
        this.setState({ poster: posterJson }); 

        console.log('llego posterrrrrrrrr', posterJson);


    }


    render() {    
        return (
            <div>
                <button id="action" type="button" onClick={() => this.handleClick('xxxx')}>mandar algo</button>
            </div>
        )
      }

  }
  export default PosterWatch;