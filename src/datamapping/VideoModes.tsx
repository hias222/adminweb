import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import VideoIcon from '@mui/icons-material/Videocam';

export default class VideoModes extends React.Component {

  private backendConnect = process.env.REACT_APP_BACKEND_DIRECT === "true" ? window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/datamapping/send-mqtt" : process.env.REACT_APP_DATAMAPPING_INTERNAL_URL + "/datamapping/send-mqtt"

  sendAction = (version: string) => (event: any) => {
    console.log(this.backendConnect + " video " + version)
    fetch(this.backendConnect, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "message": "video " + version
      })
    })
      .catch(console.log)
  };


  render() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button variant="contained" onClick={this.sendAction('1')}>
            1
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={this.sendAction('2')}>
            2
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={this.sendAction('3')}>
            3
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={this.sendAction('4')}>
            RTMP-HLS
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={this.sendAction('5')}>
            RTMP-Dash
            <VideoIcon />
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    )
  };

};