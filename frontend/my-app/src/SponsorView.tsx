import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import './VsCsView.scss';

const sponsorUrl = "http://localhost:5000/sponsors/";

function SponsorView(props:any) {

  let logoPos: string = "";
    switch (props.sponsor_logo_position) {
    case 0:
      logoPos = "sponsorContainerBottomMiddle";
      break;
    case 1:
      logoPos = "sponsorContainerBottomLeft";
      break;
    case 2:
      logoPos = "sponsorContainerBottomRight";
      break;
    case 3:
      logoPos = "sponsorContainerTopRight";
      break;
    case 999:
      logoPos = "sponsorContainerCsGo";
      break;
  }

  return (
      <div className={logoPos}>
        {props.sponsor_logo_paths !== undefined ?
          props.sponsor_logo_paths.map((row:any, index:any) => {
            console.log(row)
            return (
                props.isLocalUrlsOnly? 
                <img className="sponsorPicture" src={row} /> :
                <img className="sponsorPicture" src={sponsorUrl + row} />
            );
          })
          : <div />}
      </div>
  );
}

export default observer(SponsorView);
