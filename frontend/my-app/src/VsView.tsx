import React from 'react';
import './VsView.scss';

interface VsViewProps {
   score_a: number;
     score_b: number;
     logo_orga_path_a: string;
     logo_orga_path_b: string;
     logo_team_path_a: string;
     logo_team_path_b: string;
     team_name_a: string;
     team_name_b: string;
}

function VsView(props:VsViewProps) {
  return (
    <div className="container">
      <div className="vs-text">vs</div>
      <div className="announce-text">
        <a className="information-text">upcoming match</a>
      </div>
      <div className="team-top">
        <div className="score">{props.score_a}</div>
        <img src={props.logo_orga_path_a} alt="ups..." className="picture-orga" />
        <img src={props.logo_team_path_a} alt="ups..." className="picture-team" />
        <div className="team-name">
          <div className="team-name-container">
          <div className="team-name-text">{props.team_name_a}</div>
          </div>
          </div>
      </div>
      <div className="team-bottom">
      <div className="score">{props.score_a}</div>
      <img src={props.logo_orga_path_b} alt="ups..." className="picture-orga" />
        <img src={props.logo_team_path_b} alt="ups..." className="picture-team" />
          <div className="team-name">
          <div className="team-name-container">
          <div className="team-name-text">{props .team_name_b}</div>
          </div>
          </div>
      </div>
      <div className="caster-text">
        <a>Caster: some and friends</a>
      </div>
    </div>
  );
}

export default VsView;
