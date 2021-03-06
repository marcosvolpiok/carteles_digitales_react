import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
const env = process.env.NODE_ENV || 'production';
const config = require('../../../config/config.json')[env];
const moment = require('moment');

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
        this.handleValidation = this.handleValidation.bind(this);

    }


    handleValidation(){
        let errors=[];

        if(!this.state.name){
            console.log('nombre nulo');
            errors.push({name: 'name', value:'Name Is a mandatory field'})
        }

        if(!moment('2000-01-01 '+this.state.end_time, 'YYYY-MM-DD HH:mm', true).isValid()){
            console.log('no es valido el');
            errors.push({name: 'end_date', value:'End date Is a mandatory field'})
        }

        if(!moment('2000-01-01 '+this.state.init_time, 'YYYY-MM-DD HH:mm', true).isValid()){
            errors.push({name: 'init_date', value:'Init date Is a mandatory field'})
        }

        if(errors.length>0){
            let errorsString='Errors:';
            errors.forEach(e=>{
                errorsString=errorsString + "\n" + e.value;
            })
            alert(errorsString);
            return false;
        }

        const endTime = new Date(moment('2000-01-01 '+this.state.end_time).format('YYYY-MM-DD HH:mm'));
        const initTime = new Date (moment('2000-01-01 '+this.state.init_time).format('YYYY-MM-DD HH:mm'));
        console.log(endTime);
        console.log(initTime);
        
        if(endTime<initTime){
            alert('El timpo final no puede ser superior al tiempo inicial');
            return false;
        }

        return true;
    }

    async handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        await this.setState({
            [name]: value
        });
    }

    async handleClick () {
        if(this.handleValidation()){
            console.log('Submit!... ', this.state);
            const response = await fetch(`${config.api}/poster/add/`, {
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
            const responseJson = await response.json();
            this.props.history.push(`/posters/addImage/${responseJson._id}`); //Redirect
        }
    }

    render() {
        return (
        <div>
            <h1>Add poster</h1>
            <form>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text"><input type="text" onChange={this.handleInputChange} name="name" placeholder="Name" /></p>
                        
                        <p className="card-text">Init: <input type="time" onChange={this.handleInputChange} name="init_time" placeholder="Init" /></p>
                        <p className="card-text">End: <input type="time" onChange={this.handleInputChange} name="end_time" placeholder="End" /></p>
                        

                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Next</button>
                    </div>
                </div>
            </form>
        </div>
        )
        
      }

  }
export default withCookies(PostersAdd);