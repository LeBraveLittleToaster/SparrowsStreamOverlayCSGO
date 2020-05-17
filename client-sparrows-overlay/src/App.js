import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div>
      <h1> Sparrows Overlay </h1>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/wait">Waiting</Link>
              </li>
              <li>
                <Link to="/console"> Console </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/wait">
              <p> wait </p>
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
