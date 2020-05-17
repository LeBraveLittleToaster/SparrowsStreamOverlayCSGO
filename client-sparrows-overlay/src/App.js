import React from 'react';
import Waiting from './components/waitscreen';
import Console from './components/console';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/wait-preview">
            <Navbar/>
            <Waiting />
          </Route>
          <Route path="/wait">
            <Waiting />
          </Route>
          <Route path="/console">
            <Navbar/>
            <Console />
          </Route>
          <Route path="/">
            <Navbar/>
            <p> Home </p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function Navbar() {
  return (
    <div id="navbar">
      <h1> Sparrows Overlay </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/wait-preview">wait Preview</Link>
          </li>
          <li>
            <Link to="/console"> console </Link>
          </li>
        </ul>
      </nav>
    </div>)
}


export default App;
