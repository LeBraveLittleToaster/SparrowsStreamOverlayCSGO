import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NetworkUtils from "./NetworkUtils";
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { pictureStore } from "./PictureStore";
import { teamStore } from "./TeamStore";

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
    listitem_selected: {
        backgroundColor: "#18803c"
    },
    listitem_unselected: {
        
    },
    submitBtn: {
        marginTop: 20
    },
    picture: {
        width: "60%",
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

    useEffect(() => {
        NetworkUtils.getActiveLogos().then((data:any) => {
            teamStore.setLogoPaths(data["logo_orga_path_a"],data["logo_team_path_a"],data["logo_orga_path_b"],data["logo_team_path_b"]);
            NetworkUtils.getAllPictureUrls()
            .then((urls: string[]) => {
                setLoadingState(1);
                pictureStore.picUrls = urls;
                console.log(urls)
            }).catch(err => {
                setLoadingState(2)
            });
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    function setActiveRow(isA: boolean, isTeamLogo: boolean, picUrl: string |undefined) {
        console.log("Selecting Team | isA=" + isA + " | isTeamLogo=" + isTeamLogo)
        NetworkUtils.uploadActivePicture(isA, isTeamLogo, picUrl).then(v => {
            console.log(v);
        }).catch((err) => console.log("Error selecting team"));
    }

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
                                    <TableCell align="left">Orga Logo A</TableCell>
                                    <TableCell align="left">Team Logo A</TableCell>
                                    <TableCell align="left">Orga Logo B</TableCell>
                                    <TableCell align="left">Team Logo B</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={0}>
                                        <TableCell>None</TableCell>
                                        <TableCell className={teamStore.logo_orga_path_a === undefined ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(true, false ,undefined)}>Click</TableCell>
                                        <TableCell className={teamStore.logo_team_path_a === undefined ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(true, true ,undefined)}>Click</TableCell>
                                        <TableCell className={teamStore.logo_orga_path_b === undefined ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(false, false, undefined)}>Click</TableCell>
                                        <TableCell className={teamStore.logo_team_path_b === undefined ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(false, true, undefined)}>Click</TableCell>
                                    </TableRow>
                                {pictureStore.picUrls.map((row, index) => {
                                    return (<TableRow key={index + 1}>
                                        <TableCell><img className={classes.picture} src={baseUrl + row} /></TableCell>
                                        <TableCell className={teamStore.logo_orga_path_a === row ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(true, false ,row)}>Click</TableCell>
                                        <TableCell className={teamStore.logo_team_path_a === row ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(true, true ,row)}>Click</TableCell>
                                        <TableCell className={teamStore.logo_orga_path_b === row ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(false, false, row)}>Click</TableCell>
                                        <TableCell className={teamStore.logo_team_path_b === row ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => setActiveRow(false, true, row)}>Click</TableCell>
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