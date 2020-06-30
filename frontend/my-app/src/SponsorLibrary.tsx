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

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { settingsStore } from "./SettingsStore";

const baseUrl = "http://localhost:5000/sponsors/";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 500
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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

function SponsorLibrary() {
    const classes = useStyles();
    // 0 not loaded, 1 success, 2 failed
    const [loadingState, setLoadingState] = useState(0);

    useEffect(() => {
        NetworkUtils.getActiveSponsorLogos().then((data: any) => {
            teamStore.setSponsorLogoPaths(data.logo_paths);
            NetworkUtils.getAllSponsorPictureUrls()
                .then((urls: string[]) => {
                    setLoadingState(1);
                    pictureStore.sponsorUrls = urls;
                    console.log(urls)
                }).catch(err => {
                    setLoadingState(2)
                });
        }).catch((err) => {
            console.log(err);
        })
        NetworkUtils.getSponsorLogoPositionSetting()
            .then((pos: number) => {
                settingsStore.sponsor_logo_position = pos;
                console.log(pos)
            }).catch(err => {
                setLoadingState(2)
            });
    }, [])

    function onRowClicked(picUrl: string | undefined) {
        console.log("Selecting Sponsor: " + picUrl);
        NetworkUtils.uploadActiveSponsorPictures(picUrl).then(v => {
            console.log(v);
        }).catch((err) => console.log("Error selecting sponsor"));
    }

    function onSelect(event: any) {
        NetworkUtils.uploadSponsorLogoPositionSetting(event.target.value);
    }

    return (

        <div className={classes.root}>
            <Grid container spacing={3}>
                <Paper className={classes.paper}>
                    <h1 className={classes.headerTeams}>Sponsor Library</h1>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Position</InputLabel>
                        <Select
                            native
                            value={settingsStore.sponsor_logo_position}
                            onChange={(e) => onSelect(e)}
                            label="Position"
                            inputProps={{
                                name: 'position',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option value={0}>bottom mid</option>
                            <option value={1}>bottom left</option>
                            <option value={2}>bottom right</option>
                            <option value={3}>top right</option>
                        </Select>
                    </FormControl>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="Teams">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Picture</TableCell>
                                    <TableCell align="left">Show</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pictureStore.sponsorUrls.map((row, index) => {
                                    return (<TableRow key={index + 1}>
                                        <TableCell><img className={classes.picture} src={baseUrl + row} /></TableCell>
                                        <TableCell className={teamStore.sponsor_logo_paths.find(s => s === row) !== undefined ? classes.listitem_selected : classes.listitem_unselected}
                                            onClick={() => onRowClicked(row)}>Click</TableCell>
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

export default observer(SponsorLibrary);