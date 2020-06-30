import React from "react";
import { observer } from "mobx-react";
import Teams from './Teams';
import TeamList from './TeamList';
import { Grid, makeStyles } from "@material-ui/core";
import Settings from './Settings';
import PictureView from "./PictureView";
import PictureLibrary from "./PictureLibrary";
import SponsorLibrary from "./SponsorLibrary";
import {Helmet} from 'react-helmet';

const useStyles = makeStyles((theme) => ({
    container : {
        marginTop: 100,
        maxWidth: 500
    },
    grid: {
        width:"100%"
    }
}));

function CsConsole() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Helmet>
                <style>{'body { background-color: rgb(51,51,51); }'}</style>
            </Helmet>
            <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12}>
                    <Teams />
                </Grid>
                <Grid item xs={12}>
                    <Settings/>
                </Grid>
                <Grid item xs={12}>
                    <PictureView/>
                </Grid>
                <Grid item xs={12}>
                    <TeamList />
                </Grid>
                
                <Grid item xs={12}>
                    <SponsorLibrary/>
                </Grid>
                <Grid item xs={12}>
                    <PictureLibrary/>
                </Grid>
            </Grid>


        </div>
    );
}

export default observer(CsConsole);