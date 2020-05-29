import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './index.css';
import VsView from './VsView';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/vs">
            <VsView/>
          </Route>
          <Route path="/console">
            <a>Not yet implemented</a>
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

