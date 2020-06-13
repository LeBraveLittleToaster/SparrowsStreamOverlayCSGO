import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import './VsCsView.scss';
import { csStore } from './CsStore';
import { teamStore } from './TeamStore';
import NetworkUtils from './NetworkUtils';

const baseUrl = "http://localhost:5000/res/";

function VsCsView() {

  useEffect(() => {
    NetworkUtils.getActiveLogos().then((data:any) => {
      teamStore.setLogoPaths(data["logo_orga_path_a"],data["logo_team_path_a"],data["logo_orga_path_b"],data["logo_team_path_b"]);
    }).catch((err) => {
      console.log(err);
    })
    NetworkUtils.getActiveTeams().then((data:any) => {
      console.log("A:" + data.a + " | B:" + data.b)
      teamStore.team_a_id = data.a;
      teamStore.team_b_id = data.b;
    }).catch((err) => console.log(err))
    NetworkUtils.getCaster().then((data:any) => {
      csStore.caster_names = data.caster;
    }).catch((err) => console.log(err))
  }, [])

  let orga_a = teamStore.logo_orga_path_a === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_orga_path_a ;
  let team_a = teamStore.logo_team_path_a === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_team_path_a;
  let orga_b = teamStore.logo_orga_path_b === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_orga_path_b ;
  let team_b = teamStore.logo_team_path_b === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_team_path_b;

  return (
    <div className="container">
      <div className="vs-text">vs</div>
      <div className="announce-text">
        <a className="information-text">upcoming match</a>
      </div>
      <div className="team-top">
        <div className="score">{csStore.score_a}</div>
        <img src={orga_a} alt="logo512.png" className="picture-orga" />
        <img src={team_a} alt="ups..." className="picture-team" />
        <div className="team-name">
          <div className="team-name-container">
            <div className="team-name-text">{teamStore.getTeamWithId(teamStore.team_a_id)?._name}</div>
          </div>
        </div>
      </div>
      <div className="team-bottom">
        <div className="score">{csStore.score_b}</div>
        <img src={orga_b} alt="ups..." className="picture-orga" />
        <img src={team_b} alt="ups..." className="picture-team" />
        <div className="team-name">
          <div className="team-name-container">
            <div className="team-name-text">{teamStore.getTeamWithId(teamStore.team_b_id)?._name}</div>
          </div>
        </div>
      </div>
      <div className="caster-text">
        <a>Caster: {csStore.caster_names}</a>
      </div>
    </div>
  );
}

export default observer(VsCsView);
