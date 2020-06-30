import React from "react";
import { observer } from "mobx-react";
import Teams from './Teams';
import TeamList from './TeamList';
import { makeStyles, Box } from "@material-ui/core";
import Settings from './Settings';
import PictureView from "./PictureView";
import PictureLibrary from "./PictureLibrary";
import SponsorLibrary from "./SponsorLibrary";
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%"
    }
}));

function CsConsole() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Helmet>
                <style>{'body { background-color: rgb(51,51,51); }'}</style>
            </Helmet>
            <Box
                display="flex"
                flexWrap="wrap"
                p={1}
                m={1}
                css={{ maxWidth: 1100 }}>
                <Box p={1}>
                    <Teams />
                </Box>
                <Box p={1}>
                    <Settings />
                </Box>
                <Box p={1}>
                    <PictureView />                
                </Box>
                <Box p={1}>
                    <TeamList />
                </Box>
                <Box p={1}>
                    <SponsorLibrary />
                </Box>
                <Box p={1}>
                    <PictureLibrary />
                </Box>

            </Box>








        </div>
    );
}

export default observer(CsConsole);