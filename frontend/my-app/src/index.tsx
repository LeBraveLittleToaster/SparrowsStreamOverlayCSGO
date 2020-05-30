import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './index.css';
import VsView from './VsView';
import Console from './Console';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/vs">
            <VsView/>
          </Route>
          <Route path="/console">
            <Console/>
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);