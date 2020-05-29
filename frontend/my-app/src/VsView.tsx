import React from 'react';
import './VsView.scss';

function VsView() {
  return (
    <div className="container">
      <div className="announce-text">
        <a className="information-text">upcoming match</a>
      </div>
      <div className="team-top">
        <div>
          <div className="score">0</div>
          <div className="orga-picture-container">
            <img src="logo192.png" alt="smiley" className="orga-picture"/>
          </div>
          <div className="team-picture"></div>
          <div className="team-name"></div>
        </div>
      </div>
      <div className="team-bottom">
        <div>
        <div className="score">0</div>
        </div>
      </div>
      <div className="caster-text">
        <a>Caster: some and friends</a>
      </div>
    </div>
  );
}

export default VsView;
