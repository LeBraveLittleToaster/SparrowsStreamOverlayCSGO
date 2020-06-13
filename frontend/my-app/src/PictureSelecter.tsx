import React, { useState, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
    },
    submitBtn: {
        marginTop: 20
    }
}));

function PictureSelecter() {
    const classes = useStyles();
    const [isLoaded, setIsloaded] = useState(false);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Paper className={classes.paper}>
                    <h1 className={classes.headerTeams}>Upload picture</h1>
                    
                </Paper>
            </Grid>
        </div>
    );
}

export default observer(PictureSelecter);