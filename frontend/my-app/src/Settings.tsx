import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { settingsStore } from './SettingsStore';
import { Checkbox, FormControlLabel, Typography, TextField, Button, Switch } from "@material-ui/core";
import { teamStore } from "./TeamStore";
import NetworkUtils from "./NetworkUtils";
import { csStore } from "./CsStore";

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
    formcontrol: {
        marginTop: 30
    },
    headerTeams: {
        marginBottom: theme.spacing(6)
    },
    submitBtn: {
        marginLeft: 10
    }
}));

function Settings() {
    const classes = useStyles();

    useEffect(() => {
        NetworkUtils.getScore().then((data: any) => {
            console.log(data);
            if (data["score_a"]) csStore.score_a = Number(data["score_a"]);
            if (data["score_b"]) csStore.score_b = Number(data["score_b"])
        }).catch((err) => console.log(err))
        NetworkUtils.getCaster().then((data: any) => {
            console.log(data);
            if (data["caster"]) teamStore.caster = data["caster"]
        }).catch((err) => console.log(err))
        NetworkUtils.getSettingDropTeamsOnClose().then((isDropping:boolean) => {
            settingsStore.isDroppingTeamsOnClose = isDropping;
        }).catch((err) => console.log(err))
    }, [])

    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
        NetworkUtils.uploadSettingDropTeamsOnServerClose(event.target.checked);
    }

    function setScore(isA: boolean, value: string) {
        if (isA) { csStore.score_a = Number(value) } else { csStore.score_b = Number(value) }
    }

    function submitScore() {
        NetworkUtils.uploadScore(csStore.score_a, csStore.score_b);
    }

    function setCaster(value: string) {
        teamStore.caster = value;
    }

    function submitCaster() {
        NetworkUtils.uploadCaster(teamStore.caster);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Paper className={classes.paper}>
                    <h1 className={classes.headerTeams}>General Settings</h1>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField id="outlined-helperText"
                                label="Score A"
                                type="number"
                                value={csStore.score_a}
                                defaultValue={csStore.score_a === undefined ? 0 : csStore.score_a}
                                onChange={(e) => setScore(true, e.target.value)}
                                variant="outlined" />
                            <TextField id="outlined-helperText"
                                label="Score B"
                                type="number"
                                value={csStore.score_b}
                                defaultValue={csStore.score_b === undefined ? 0 : csStore.score_b}
                                onChange={(e) => setScore(false, e.target.value)}
                                variant="outlined" />
                            <Button variant="outlined" className={classes.submitBtn} onClick={() => submitScore()}>
                                Set
                        </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-helperText"
                                label="Caster names"
                                defaultValue={teamStore.caster === undefined ? "" : teamStore.caster}
                                onChange={(e) => setCaster(e.target.value)}
                                variant="outlined" />

                            <Button variant="outlined" className={classes.submitBtn} onClick={() => submitCaster()}>
                                Set
                        </Button>
                        </Grid>
                    </Grid>
                    <FormControlLabel className={classes.formcontrol}
                        control={
                            <Switch
                                checked={settingsStore.isDroppingTeamsOnClose}
                                onChange={(e) => handleChange(e)}
                                name="Drop Teams"
                                color="primary"
                            />
                        }
                        label="Deleting Teams on shut down"
                    />
                </Paper>
            </Grid>
        </div>
    );
}

export default observer(Settings);