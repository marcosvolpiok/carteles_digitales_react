import React from 'react'
import {Link} from 'react-router-dom';
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const env = process.env.NODE_ENV || 'production';
const config = require('../../../config/config.json')[env];
const moment = require('moment');

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

        console.log(posterJson);
    }



    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let endTimeHours;
        let initTimeHours;
        this.setState({
            [name]: value
        });
    }


    handleValidation(){
        let errors=[];
        let endTimeHours;
        let initTimeHours;

        if(!this.state.end_time){
            endTimeHours=this.state.poster.end_time;
        }else{
            endTimeHours=this.state.end_time;
        }

        if(!this.state.init_time){
            initTimeHours=this.state.poster.init_time;
        }else{
            initTimeHours=this.state.init_time;
        }


        console.log('endTimeHours', endTimeHours);
        if(!moment('2000-01-01 '+endTimeHours, 'YYYY-MM-DD HH:mm', true).isValid()){
            console.log('no es valido el end_time');
            errors.push({name: 'end_date', value:'End date Is a mandatory field'})
        }

        console.log('initTimeHours', initTimeHours);
        if(!moment('2000-01-01 '+initTimeHours, 'YYYY-MM-DD HH:mm', true).isValid()){
            errors.push({name: 'init_date', value:'Init date Is a mandatory field'})
        }

        let errorsString='Errors:';
        if(errors.length>0){
            errors.forEach(e=>{
                errorsString=errorsString + "\n" + e.value;
            })
            alert(errorsString);
            return false;
        }

        const endTime = new Date(moment('2000-01-01 '+endTimeHours).format('YYYY-MM-DD HH:MM'));
        const initTime = new Date (moment('2000-01-01 '+initTimeHours).format('YYYY-MM-DD HH:MM'));
        console.log(endTime);
        console.log(initTime);
        
        if(endTime<initTime){
            errorsString=errorsString+'El timpo final no puede ser superior al tiempo inicial';
            alert(errorsString);
            return false;
        }

        return true;
    }

    async handleClick () {
        if(this.handleValidation()){
            console.log('Submit!... ', this.state);
            const response = await fetch(`${config.api}/poster/update/${this.state.id}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
                },
                body: JSON.stringify({
                    name: this.state.name,
                    init_time: this.state.init_time,
                    end_time: this.state.end_time,
                    
                }) 
            });
            console.log(response);
            //this.props.history.push('/posters/'); //Redirect
            this.props.history.push(`/posters/addImage/${this.state.id}`); //Redirect
        }
    }

    filterBySize = (file) => {
        //filter out images larger than 5MB
        return file.size <= 5242880;
    };

    


    
    render() {
        const poster = this.state.poster;

        return (
        <div>
            {poster._id  &&
                <form>
                    <div className="card" key={poster._id}>
                    <div className="card-body">
                        <p className="card-text"><input type="text" defaultValue={poster.name} onChange={this.handleInputChange} name="name" placeholder="Name" /></p>

                        <p className="card-text">Init: <input type="time" onChange={this.handleInputChange} name="init_time" defaultValue={poster.init_time} /></p>
                        <p className="card-text">End: <input type="time" onChange={this.handleInputChange} name="end_time" defaultValue={poster.end_time} /></p>

                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Next</button>
                    </div>
                    </div>
                </form>
           
            }

            
            {!poster._id &&
                <h2>No such any poster.</h2>
            }
        </div>
        )
        
      }
  }
export default withCookies(PostersEdit);