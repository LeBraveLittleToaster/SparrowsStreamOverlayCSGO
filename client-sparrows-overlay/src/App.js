import React from 'react';
import Waiting from './components/waitscreen';

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
        <div>
          <div id="navbar">
            <h1> Sparrows Overlay </h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/wait">wait</Link>
                </li>
                <li>
                  <Link to="/console"> console </Link>
                </li>
              </ul>
            </nav>
          </div>

          <Switch>
            <Route path="/wait">
              <Waiting />
            </Route>
            <Route path="/console">
              <p> console </p>
            </Route>
            <Route path="/">
              <p> Home </p>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
