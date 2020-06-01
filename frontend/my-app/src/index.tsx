import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import './index.css';
import VsCsView from './VsCsView';
import CsConsole from './CsConsole';
import { wsCon } from './WsCon';
import NetworkUtils from './NetworkUtils';
import Team from './data/Team';
import { teamStore } from './TeamStore';

NetworkUtils.getCurrentTeams().then((teams: Team[]) => {
  teams.forEach((team: Team) => {
      teamStore.addTeam(team);
  });
})
.catch(error => console.log(error));

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

      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);