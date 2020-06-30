import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import './VsCsView.scss';
import { csStore } from './CsStore';
import { teamStore } from './TeamStore';
import NetworkUtils from './NetworkUtils';
import Team from './data/Team';
import { settingsStore } from './SettingsStore';
import SponsorView from './SponsorView';

const baseUrl = "http://localhost:5000/res/";
const sponsorUrl = "http://localhost:5000/sponsors/";

function VsCsView() {

  useEffect(() => {
    NetworkUtils.getCurrentTeams().then((teams: Team[]) => {
      console.log("Adding teams")
      console.log(teams)
      teams.forEach((team: Team) => {
        teamStore.addTeam(team);
      });
    })
      .catch(error => console.log(error));
    NetworkUtils.getScore().then((data: any) => {
      if (data["score_a"]) csStore.score_a = Number(data["score_a"]);
      if (data["score_b"]) csStore.score_b = Number(data["score_b"])
    }).catch((err) => console.log(err))
    NetworkUtils.getActiveLogos().then((data: any) => {
      teamStore.setLogoPaths(data["logo_orga_path_a"], data["logo_team_path_a"], data["logo_orga_path_b"], data["logo_team_path_b"]);
    }).catch((err) => {
      console.log(err);
    })
    NetworkUtils.getActiveTeams().then((data: any) => {
      teamStore.team_a_id = data.a;
      teamStore.team_b_id = data.b;
    }).catch((err) => console.log(err))
    NetworkUtils.getCaster().then((data: any) => {
      teamStore.caster = data.caster;
    }).catch((err) => console.log(err))
    NetworkUtils.getActiveSponsorLogos().then((data: any) => {
      teamStore.sponsor_logo_paths = data.logo_paths;
    }).catch((err) => console.log(err))
    NetworkUtils.getTeamBColorRampIndex().then((index: number) => {
      teamStore.setTeamBColorRampIndex(index);
    }).catch(error => console.log(error));
  }, [])

  let orga_a = teamStore.logo_orga_path_a === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_orga_path_a;
  let team_a = teamStore.logo_team_path_a === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_team_path_a;
  let orga_b = teamStore.logo_orga_path_b === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_orga_path_b;
  let team_b = teamStore.logo_team_path_b === undefined ? "./../logo512.png" : baseUrl + teamStore.logo_team_path_b;

  function getRampCss(index: number): string {
    console.log("Setting color ramp: " + index)
    switch (index) {
      case 0: return "team-bottom-default";
      case 1: return "team-bottom-1";
      case 2: return "team-bottom-2";
      case 3: return "team-bottom-3";
      case 4: return "team-bottom-4";
      case 5: return "team-bottom-5";
      case 6: return "team-bottom-6";
      default: return "team-bottom-default";
    }
  }

  let cssRamp:string = getRampCss(teamStore.team_b_color_ramp_index);

  return (
    <div>
      <SponsorView
        isLocalUrlsOnly={false}
        sponsor_logo_position={settingsStore.sponsor_logo_position}
        sponsor_logo_paths={teamStore.sponsor_logo_paths} />
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
        <div key={teamStore.team_b_color_ramp_index} className={cssRamp}>
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
          <a>Caster: {teamStore.caster}</a>
        </div>
      </div>

    </div>
  );
}

export default observer(VsCsView);
