import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import {teamStore} from "./TeamStore";

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

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    teamStore.team_name_a = e.target.value;
}

function Teams() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                
                    <Paper className={classes.paper}>
                        <h1 className={classes.headerTeams}>Configure Team A</h1>
                        <form noValidate autoComplete="off">
                            <TextField id="outlined-helperText"
                                label="Team Name A"
                                defaultValue= {teamStore.team_name_a}
                                onChange={onChange}
                                variant="outlined" />
                        </form>
                    </Paper>
                    <Paper className={classes.paper}>
                        <h1 className={classes.headerTeams}>Configure Team B</h1>
                        <form noValidate autoComplete="off">
                            <TextField id="outlined-helperText"
                                label="Team Name A"
                                defaultValue= {teamStore.team_name_b}
                                onChange={onChange}
                                variant="outlined" />
                        </form>
                    </Paper>
            </Grid>
        </div>
    );
}

export default observer(Teams);