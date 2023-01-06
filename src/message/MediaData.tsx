import { Button, Grid } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import { deleteFile } from "./queries/deleteFile";
import { getFileList } from "./queries/getFileList";
import { sendFilenName } from "./queries/sendFileName";
import DeleteItem from '@material-ui/icons/Delete';

export default function MediaData() {

    const [mediaFiles, setMediaFiles] = useState([]);
    const [update, setUpdate] = useState(0);

    const sendFileLocal = (fileName: string) => (event: any) => {
        console.log(fileName)
        sendFilenName(fileName)
               
    }

    const deleteFileLocal = (fileName: string) => (event: any) => {
        console.log(fileName)
        deleteFile(fileName)
        setUpdate(update + 1)
    }

    const updateLocal = () => (event: any) => {
        setUpdate(update + 1)
    }

    useEffect(() => {

        getFileList().then((data) => {
            setMediaFiles(data)
        })

    }, [update]);
    //onClick={sendFileLocal(item)

    return (
        <div>
            <Grid container spacing={1}>
                {mediaFiles.map(item =>
                    <Grid key={'grid' + item} item xs={4}>
                        <Button variant="contained" color="default" key={item} onClick={sendFileLocal(item)}>
                            {item}
                        </Button>
                        <Button variant="contained" color="default" key={'del_' + item} onClick={deleteFileLocal(item)}>
                            <DeleteItem />
                        </Button>
                    </Grid>
                )}
            </Grid>

            <Grid key={'grid_update'} container spacing={2}>
                <Grid item xs={4}>
                    <Button variant="contained" color="default" key="updateLocal" onClick={sendFileLocal('4')}>
                        HLS
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="default" key="updateLocal" onClick={sendFileLocal('5')}>
                        Dash
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" color="default" key="updateLocal" onClick={updateLocal()}>
                        Update List
                    </Button>
                </Grid>
            </Grid>

        </div>
    );


}