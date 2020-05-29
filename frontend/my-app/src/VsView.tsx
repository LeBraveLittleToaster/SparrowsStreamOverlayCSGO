import React from 'react';
import {observer} from 'mobx-react';
import './VsView.scss';
import {vsStore} from './VsStore';

function VsView() {
  return (
    <div className="container">
      <div className="vs-text">vs</div>
      <div className="announce-text">
  <a className="information-text">upcoming match</a>
      </div>
      <div className="team-top">
        <div className="score">{vsStore.score_a}</div>
        <img src={vsStore.logo_orga_path_a} alt="ups..." className="picture-orga" />
        <img src={vsStore.logo_team_path_a} alt="ups..." className="picture-team" />
        <div className="team-name">
          <div className="team-name-container">
          <div className="team-name-text">{vsStore.team_name_a}</div>
          </div>
          </div>
      </div>
      <div className="team-bottom">
      <div className="score">{vsStore.score_b}</div>
      <img src={vsStore.logo_orga_path_b} alt="ups..." className="picture-orga" />
        <img src={vsStore.logo_team_path_b} alt="ups..." className="picture-team" />
          <div className="team-name">
          <div className="team-name-container">
          <div className="team-name-text">{vsStore.team_name_b}</div>
          </div>
          </div>
      </div>
      <div className="caster-text">
        <a>Caster: {vsStore.caster_names}</a>
      </div>
    </div>
  );
}

export default observer(VsView);
