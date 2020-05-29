import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VsView from './VsView';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <VsView 
    score_a={0} 
    score_b={1}
    logo_orga_path_a="logo512.png"
    logo_orga_path_b="logo512.png"
    logo_team_path_a="logo512.png"
    logo_team_path_b="logo512.png"
    team_name_a="Ultra long teamname from team a"
    team_name_b="more and more characters for teamname b"/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
