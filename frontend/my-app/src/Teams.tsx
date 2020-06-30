import React, { useState } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { teamStore } from "./TeamStore";
import { Button} from "@material-ui/core";
import NetworkUtils from "./NetworkUtils";
import Team from "./data/Team";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
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
    },
    submitBtn: {
        marginTop: 20
    }
}));

interface ITeam {
    name: string;
}

function Teams() {
    const classes = useStyles();
    const [team, setTeam] = useState<ITeam>({ name: "" });

    function submitTeamName(name: string) {
        if (name.length > 1) {
            NetworkUtils.uploadTeam(new Team("", name, undefined, undefined));
        }
    }

    

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Paper className={classes.paper}>
                    <h1 className={classes.headerTeams}>Create Team</h1>
                    <form noValidate autoComplete="off">
                        <TextField id="outlined-helperText"
                            label="Team Name A"
                            defaultValue={teamStore.getTeamWithId(teamStore.team_a_id)?._name}
                            onChange={(e) => setTeam({ name: e.target.value })}
                            variant="outlined" />
                    </form>

                    <Button variant="outlined" className={classes.submitBtn} onClick={() => submitTeamName(team.name)}>
                        Create
                        </Button>
                </Paper>
            </Grid>
        </div>
    );
}

export default observer(Teams);