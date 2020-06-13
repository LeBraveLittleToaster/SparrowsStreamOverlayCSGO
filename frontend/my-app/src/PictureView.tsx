import React, { useState, FormEvent, ChangeEvent } from "react";
import { observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ImageUploader from 'react-images-upload';
import NetworkUtils from "./NetworkUtils";

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

function PictureView() {
    const classes = useStyles();
    const [picture, setPictures] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("Failed");

    const onDrop = (pictureUpdate: any) => {
        setPictures(pictureUpdate);
        setIsBtnDisabled(pictureUpdate.length === 0)
    };

    const uploadPicture = () => {
        if (picture !== []) {
            NetworkUtils.uploadPicture(picture[0])
                .then((resp) => {
                    setErrorMessage("")
                }).catch((err) => {
                    setErrorMessage("Failed: Name taken, rename file please")
                }).finally(() => {
                    setIsBtnDisabled(true);
                });
        }

    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Paper className={classes.paper}>
                    <h1 className={classes.headerTeams}>Upload picture</h1>
                    <h4>{errorMessage === "" ?
                        { errorMessage } :
                        "Please name your file with the team or organame"}
                    </h4>
                    <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        onChange={onDrop}
                        imgExtension={[".jpg", ".png"]}
                        maxFileSize={5242880}
                        singleImage={true}
                        label="jpg or png, max 5mb"
                        buttonText="Choose image"
                    />

                    <Button
                        variant="outlined"
                        className={classes.submitBtn}
                        onClick={uploadPicture}
                        disabled={isBtnDisabled}>
                        Upload
                        </Button>
                </Paper>
            </Grid>
        </div>
    );
}

export default observer(PictureView);