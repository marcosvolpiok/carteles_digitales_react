import React from 'react'
import {Link} from 'react-router-dom';
const config = require('../../config/config.json')[env];


class PostersEdit extends React.Component {
    state = {
        posters: [],
        id: this.props.match.params.id
    };

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    async componentDidMount() {
        const postersResponse = await fetch(`${config.api}/posters/${this.state.id}`);
        const posterJson = await postersResponse.json();
        this.setState({ posters: posterJson }); 
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
        const response = await fetch(`http://localhost:4000/posters/update/${this.state.id}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            }) 
        });
        console.log(response);
        this.props.history.push('/posters/list/'); //Redirect

    }
    
    render() {
        return (
        <div>
            {this.state.posters.length > 0 &&
                <form>
                {this.state.posters.map((poster) => (
                    <div className="card" key={poster._id}>
                    <div className="card-body">
                        <p className="card-text"><input type="text" defaultValue={poster.name} onChange={this.handleInputChange} name="name" placeholder="Name" /></p>
                        
                        <img src={poster._id} />
                        <p className="card-text">{contact._id}</p>

                        <button type="button" className="btn btn-primary" onClick={() => this.handleClick()}>Edit</button>
                    </div>
                    </div>
                ))}
            </form>
            }

            {this.state.posters.length === 0 &&
                <h2>No such any poster.</h2>
            }
        </div>
        )
        
      }

  }
  export default PostersEdit;