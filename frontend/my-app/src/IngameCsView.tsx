import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import './VsCsView.scss';
import SponsorView from './SponsorView';
import { teamStore } from './TeamStore';
import NetworkUtils from './NetworkUtils';

function IngameCsView() {

  useEffect(() => {
    NetworkUtils.getActiveSponsorLogos().then((data:any) => {
      console.log(data.logo)
      teamStore.sponsor_logo_paths = data.logo_paths;
    }).catch((e) => console.log(e));
  }, []);

  return (
    <div>
        <SponsorView
          isLocalUrlsOnly={false}
          sponsor_logo_position={999}
          sponsor_logo_paths={teamStore.sponsor_logo_paths} />
    </div>
  );
}

export default observer(IngameCsView);
