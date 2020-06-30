import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import './index.css';
import VsCsView from './VsCsView';
import CsConsole from './CsConsole';
import { wsCon } from './WsCon';
import IngameCsView from './IngameCsView';
import { teamStore } from './TeamStore';


wsCon.connect().then(() => {
    console.log("Connected ws socket")
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/cs/vs">
          <VsCsView />
        </Route>
        <Route path="/cs/console">
          <CsConsole />
        </Route>
        <Route path="/cs/ingame">
          <IngameCsView />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);