import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Link, Switch, Redirect, useLocation  } from 'react-router-dom';
import Posters from './Components/back/posters/Posters.js';
import Login from './Components/back/login/Login.js';


function App() {
  return (
    <div class="x_content">
      <Router>
        <Switch>
          {/*<Route exact path='/Action/delete/:id' component={ActionsDelete} />*/}
          <Route exact path='/posters' component={Posters} />
          <Route exact path='/login' component={Login} />
          
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
