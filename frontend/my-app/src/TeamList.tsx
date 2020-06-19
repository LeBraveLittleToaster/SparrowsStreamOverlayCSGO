import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { teamStore } from "./TeamStore";
import { TableContainer, Table, TableHead, TableCell, TableBody, TableRow} from "@material-ui/core";
import NetworkUtils from "./NetworkUtils";
import Team from "./data/Team";

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
    table: {
        minWidth: 50,
    },
}));



function TeamList() {
    const classes = useStyles();

    useEffect(() => {
        NetworkUtils.getCurrentTeams().then((teams: Team[]) => {
            console.log("Adding teams")
            console.log(teams)
            teams.forEach((team: Team) => {
                teamStore.addTeam(team);
            });
          })
          .catch(error => console.log(error));
        NetworkUtils.getActiveTeams().then((data:any) => {
            console.log("A:" + data.a + " | B:" + data.b)
            teamStore.team_a_id = data.a;
            teamStore.team_b_id = data.b;
          }).catch((err) => console.log(err))
    },[])

    function setActiveRow(isA:boolean, teamId:string){
        console.log("Selecting Team")
        NetworkUtils.uploadActiveCsTeam(isA, teamId)
    }


    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="Teams">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Teamname</TableCell>
                            <TableCell align="left">is Team A</TableCell>
                            <TableCell align="left">is Team B</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamStore.teams.map((row, index) => {
                            return (<TableRow key={index}>
                                <TableCell>
                                    {row._name}
                                </TableCell>
                                <TableCell 
                                className={teamStore.team_a_id === row._teamId ? classes.listitem_selected : classes.listitem_unselected}
                                onClick={() => setActiveRow(true, row._teamId)}>
                                    Click to activate
                                </TableCell>
                                <TableCell 
                                className={teamStore.team_b_id === row._teamId ? classes.listitem_selected : classes.listitem_unselected}
                                onClick={() => setActiveRow(false, row._teamId)}>
                                    Click to activate
                                </TableCell>
                            </TableRow>);
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default observer(TeamList);