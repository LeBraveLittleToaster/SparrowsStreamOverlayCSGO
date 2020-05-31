import React from 'react';
import { observer } from 'mobx-react';
import './VsCsView.scss';
import { csStore } from './CsStore';
import { teamStore } from './TeamStore';

function VsCsView() {
  return (
    <div className="container">
      <div className="vs-text">vs</div>
      <div className="announce-text">
        <a className="information-text">upcoming match</a>
      </div>
      <div className="team-top">
        <div className="score">{csStore.score_a}</div>
        <img src={"./../" + teamStore.logo_orga_path_a} alt="ups..." className="picture-orga" />
        <img src={"./../" + teamStore.logo_team_path_a} alt="ups..." className="picture-team" />
        <div className="team-name">
          <div className="team-name-container">
            <div className="team-name-text">{teamStore.getTeamWithId(teamStore.team_a_id)?.name}</div>
          </div>
        </div>
      </div>
      <div className="team-bottom">
        <div className="score">{csStore.score_b}</div>
        <img src={"./../" + teamStore.logo_orga_path_b} alt="ups..." className="picture-orga" />
        <img src={"./../" + teamStore.logo_team_path_b} alt="ups..." className="picture-team" />
        <div className="team-name">
          <div className="team-name-container">
            <div className="team-name-text">{teamStore.getTeamWithId(teamStore.team_b_id)?.name}</div>
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
