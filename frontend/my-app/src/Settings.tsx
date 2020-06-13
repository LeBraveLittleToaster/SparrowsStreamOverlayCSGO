import React, { useState, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { settingsStore } from './SettingsStore';
import { Checkbox, FormControlLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(6),

        margin: theme.spacing(2),

        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    headerTeams: {
        marginBottom: theme.spacing(6)
    }
}));

function Settings() {
    const classes = useStyles();

    function setUseTeamPictureSetting(event: React.ChangeEvent<HTMLInputElement>) {
        settingsStore.isUsingTeamsPictureIfPresent = event.currentTarget.checked;
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Paper className={classes.paper}>
                    <h1 className={classes.headerTeams}>General Settings</h1>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={settingsStore.isUsingTeamsPictureIfPresent}
                                onChange={setUseTeamPictureSetting}
                                color="primary"
                                disabled={true}
                                name="Use Team picture"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        label="Use team picture"
                    />
                </Paper>
            </Grid>
        </div>
    );
}

export default observer(Settings);