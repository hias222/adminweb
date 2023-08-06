import { Button, Grid } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { deleteFile } from "./queries/deleteFile";
import { getFileList } from "./queries/getFileList";
import { sendFilenName } from "./queries/sendFileName";
import DeleteItem from '@mui/icons-material/Delete';

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
            <Grid container direction={'column'} spacing={4} style={{ textAlign: "center" }}>
                <Grid item xs={12}>
                    <Button variant="contained" key="updateLocal" onClick={updateLocal()}>
                        Update List
                    </Button>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
            <Grid container spacing={1} >
                {mediaFiles.map(item =>
                    <><Grid key={'grid' + item} item xs={10} sm={4} md={3}>
                        <Button variant="contained" key={item} onClick={sendFileLocal(item)} fullWidth>
                            {item}
                        </Button>
                    </Grid><Grid key={'grid2' + item} item xs={2} sm={2} md={1}>
                            <Button variant="contained" key={'del_' + item} onClick={deleteFileLocal(item)}>
                                <DeleteItem />
                            </Button>
                        </Grid></>
                )}
            </Grid>

            <Grid key={'grid_update'} container direction={'row'} spacing={2} alignContent="center">
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" key="updateLocal" onClick={sendFileLocal('1')} fullWidth>
                        Playlist
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" key="updateLocal" onClick={sendFileLocal('4')} fullWidth>
                        HLS
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant="contained" key="updateLocal" onClick={sendFileLocal('5')} fullWidth>
                        Dash
                    </Button>
                </Grid>
            </Grid>

        </div>
    );


}