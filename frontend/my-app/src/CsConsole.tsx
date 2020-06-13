import React from "react";
import { observer } from "mobx-react";
import Teams from './Teams';
import TeamList from './TeamList';
import { Grid } from "@material-ui/core";
import Settings from './Settings';
import PictureView from "./PictureView";
import PictureLibrary from "./PictureLibrary";

function CsConsole() {

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <TeamList />
                </Grid>
                <Grid item xs={4}>
                    <Teams />
                </Grid>
                <Grid item xs={6}>
                    <Settings/>
                </Grid>
                <Grid item xs={6}>
                    <PictureView/>
                </Grid>
                <Grid item xs={6}>
                    <PictureLibrary/>
                </Grid>
            </Grid>


        </div>
    );
}

export default observer(CsConsole);