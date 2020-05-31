import React from "react";
import { observer } from "mobx-react";
import Teams from './Teams';
import TeamList from './TeamList';
import { Grid } from "@material-ui/core";

function CsConsole() {

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TeamList />
                </Grid>
                <Grid item xs={3}>
                    <Teams />
                </Grid>
            </Grid>


        </div>
    );
}

export default observer(CsConsole);