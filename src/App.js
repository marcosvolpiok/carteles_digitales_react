import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Link, Switch, Redirect, useLocation  } from 'react-router-dom';
import Posters from './Components/back/posters/Posters';
import Login from './Components/back/login/Login';
import Register from './Components/back/register/Register';
import PostersAdd from './Components/back/posters/postersAdd';
import PostersEdit from './Components/back/posters/postersEdit';
import PosterDelete from './Components/back/posters/PosterDelete';
import PostersAddImage from './Components/back/posters/postersAddImage';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          {/*<Route exact path='/Action/delete/:id' component={ActionsDelete} />*/}
          <Route exact path='/posters' component={Posters} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/posters/add' component={PostersAdd} />
          <Route exact path='/posters/addImage/:id' component={PostersAddImage} />
          <Route exact path='/posters/edit/:id' component={PostersEdit} />
          <Route exact path='/poster/delete/:id' component={PosterDelete} />
                  
          
          {/*<Route path='/RouteNoMatch' component={RouteNoMatch}  />*/}
        </Switch>
    </Router>
    </div> 
  )
}

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

*/

export default App;
