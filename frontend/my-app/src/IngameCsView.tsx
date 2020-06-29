import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import './VsCsView.scss';
import SponsorView from './SponsorView';

const sponsorUrl = "http://localhost:5000/sponsors/";

function VsCsView() {

  return (
    <div>
      <SponsorView
        isLocalUrlsOnly={true}
        sponsor_logo_position={999}
        sponsor_logo_paths={["./../weiss-longversion.png"]} />
    </div>
  );
}

export default observer(VsCsView);
