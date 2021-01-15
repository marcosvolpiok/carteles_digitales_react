import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
const io = require('socket.io-client');
const moment = require('moment');

//import 'bootstrap/dist/css/bootstrap.min.css';
const env = process.env.NODE_ENVVVV || 'development';
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
        id: this.props.match.params.id,
        posterImage: null
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
        this.changePhoto(posterJson);

        setInterval(() => {
            this.changePhoto (posterJson)
        }, 1000);
    }


    changePhoto (posterJson) {
        console.log('checkea cambio de foto');
        posterJson.forEach(poster => {

            const current = moment('2000-01-01 '+moment().format('HH')+':'+moment().format('MM')+':'+moment().format('ss')).format('YYYY-MM-DD HH:MM:ss');
            //const current = moment().format('YYYY-MM-DD hh:MM:ss');
            const init = moment('2000-01-01 ' + poster.init_time).format('YYYY-MM-DD HH:MM:ss');
            const end = moment('2000-01-01 ' + poster.end_time).format('YYYY-MM-DD HH:MM:ss');

            console.log('poster.init_timeposter.init_timeposter.init_time', poster.init_time);
            if(init <= current && current<=end){
                console.log('************* MUESTRAAAAAAAAAAAAA ', poster.name);
                console.log(init, end, current);
                this.setState({ posterImage: poster.file_path }); 
            }
            console.log(init, end, current);
            
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