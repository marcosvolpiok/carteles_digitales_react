import React from 'react'
import {Link} from 'react-router-dom';
const config = require('../../config/config.json')[env];


class Posters extends React.Component {
    state = {
        posters: []
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const postersResponse = await fetch(`http://localhost:4000/posters/`);
        const posterJson = await postersResponse.json();
        this.setState({ posters: posterJson }); 
    }
    
    render() {
        return (
        <div>
            {this.state.posters.length > 0 &&
                <div>
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                        
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.posters.map((poster) => (
                            <tr key={poster.id}>
                                <td>{poster.name}</td>
                                <td>
                                    <Link to='/Edit/'>Edit</Link>
                                    <Link to='/Delete/'>Delete</Link>
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
  export default Posters;