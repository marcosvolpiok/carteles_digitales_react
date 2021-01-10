import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
const io = require('socket.io-client');
const moment = require('moment');

//import 'bootstrap/dist/css/bootstrap.min.css';
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.json')[env];

class PosterWatch extends React.Component {
    constructor(props) {
        super(props);
        //this.socket = io();
        this.socket =io(`${config.api}`, {
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
        posterJson.forEach(poster =>{
            console.log('posterrr', poster);
            let timeNow = moment().hour() +':'+ moment().minute();
            timeNow = parseInt(timeNow.toString().replace(':', ''));
            
            const initTime = parseInt(poster.init_time.toString().replace(":", ""));
            const endTime = parseInt(poster.end_time.toString().replace(":", ""));

            console.log('inittttt: ', initTime);
            console.log('now: ', timeNow);
            console.log('enddddd', endTime);



            if(timeNow>=initTime && timeNow<=endTime){
                console.log('****************muestra', poster.name);
                console.log('path', poster.file_path)
                this.setState({ posterImage: poster.file_path }); 
            }
        });



    }


    render() {    
        return (
            <div>
                {/*
                <button id="action" type="button" onClick={() => this.handleClick('xxxx')}>mandar algo</button>
                */}
                <img src={`${config.api}/`+this.state.posterImage} />
            </div>
        )
      }

  }
  export default PosterWatch;