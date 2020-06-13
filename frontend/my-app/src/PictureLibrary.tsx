import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NetworkUtils from "./NetworkUtils";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

const baseUrl = "http://localhost:5000/res/";

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
    },
    picture: {
        width: "25%",
        objectFit: "cover"
    },
    table: {
        minWidth: 50,
    }
}));

function PictureLibrary() {
    const classes = useStyles();
    // 0 not loaded, 1 success, 2 failed
    const [loadingState, setLoadingState] = useState(0);
    const [picUrls, setPicUrls] = useState<string[]>([]);

    useEffect(() => {
        NetworkUtils.getAllPictureUrls()
            .then((urls: string[]) => {
                setLoadingState(1);
                setPicUrls(urls);
                console.log(urls)
            }).catch(err => {
                setLoadingState(2)
            });
    }, [])


    return (
        <div className={classes.root}>
            
            <Grid container spacing={3}>
                <Paper className={classes.paper}>
                    <h1 className={classes.headerTeams}>Picture Library</h1>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="Teams">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Picture</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Set as </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {picUrls.map((row, index) => {
                                    return (<TableRow key={index}>
                                        <TableCell><img className={classes.picture} src={baseUrl + row}/></TableCell>
                                        <TableCell>{row}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>);
                                }
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </div>
    );
}

export default observer(PictureLibrary);